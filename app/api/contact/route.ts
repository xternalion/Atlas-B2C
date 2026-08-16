import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { full_name, business_name, email, phone, industry, website, inquiry_type, message } =
    body as {
      full_name: string;
      business_name: string;
      email: string;
      phone?: string;
      industry: string;
      website?: string;
      inquiry_type: string[];
      message: string;
    };

  const inquiry_label = Array.isArray(inquiry_type) ? inquiry_type.join(", ") : inquiry_type;

  if (!full_name || !business_name || !email || !inquiry_type?.length || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 1. Save to Supabase (source of truth)
  const { error: dbError } = await supabaseAdmin.from("ac_contact").insert([
    {
      name: full_name,
      business_name,
      email,
      phone: phone || null,
      industry,
      website: website || null,
      challenge: message,
      intent: inquiry_label,
      company: "Main",
    },
  ]);

  if (dbError) {
    console.error("Supabase insert error:", dbError.message);
    return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
  }

  // 2. Email notification via Resend
  await resend.emails.send({
    from: process.env.FROM_EMAIL ?? "Atlas <no-reply@atlascreate.io>",
    to: process.env.NOTIFY_EMAIL ?? "info@atlasinc.io",
    subject: `New Enquiry — ${inquiry_label} · ${full_name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#0e0d0c;padding:24px 32px;border-radius:12px 12px 0 0">
          <p style="color:#dd9e5e;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin:0 0 4px">Atlas · New Enquiry</p>
          <h1 style="color:#fff;font-size:22px;margin:0">${inquiry_label}</h1>
        </div>
        <div style="background:#f9f8f7;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e2de;border-top:none">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#888;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${full_name}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Business</td><td style="padding:8px 0;font-weight:600">${business_name}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#dd9e5e">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#dd9e5e">${phone}</a></td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#888">Industry</td><td style="padding:8px 0">${industry}</td></tr>
            ${website ? `<tr><td style="padding:8px 0;color:#888">Website</td><td style="padding:8px 0"><a href="${website}" style="color:#dd9e5e">${website}</a></td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e2de;margin:20px 0"/>
          <p style="color:#888;font-size:12px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:.1em">Message</p>
          <p style="font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${message}</p>
          ${phone ? `
          <div style="margin-top:24px">
            <a href="https://wa.me/${phone.replace(/\D/g, "")}?text=Hi+${encodeURIComponent(full_name)}%2C+thanks+for+reaching+out+to+Atlas!" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600">Reply on WhatsApp</a>
          </div>` : ""}
        </div>
      </div>
    `,
  }).catch((err) => console.error("Resend error:", err));

  // 3. Forward to n8n webhook (fire & forget)
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact",
        name: full_name,
        business_name,
        email,
        phone: phone ?? null,
        industry,
        website: website ?? null,
        inquiry_type: inquiry_label,
        message,
        submitted_at: new Date().toISOString(),
      }),
    }).catch((err) => console.error("n8n webhook error:", err));
  }

  return NextResponse.json({ success: true });
}
