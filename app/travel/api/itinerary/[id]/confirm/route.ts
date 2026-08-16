import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: itinerary, error: fetchError } = await supabaseAdmin
    .from("ac_itineraries")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !itinerary) {
    return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("ac_itineraries")
    .update({ status: "confirmed", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) {
    console.error("Supabase update error (ac_itineraries):", updateError.message);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }

  const title = itinerary.itinerary_json?.title ?? "Your trip";
  await resend.emails
    .send({
      from: process.env.FROM_EMAIL ?? "Atlas Travel <no-reply@atlascreate.io>",
      to: itinerary.email,
      subject: `Booking Confirmed — ${title}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0e0d0c;padding:24px 32px;border-radius:12px 12px 0 0">
            <p style="color:#dd9e5e;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin:0 0 4px">Atlas Travel · Booking Confirmed</p>
            <h1 style="color:#fff;font-size:22px;margin:0">${title}</h1>
          </div>
          <div style="background:#f9f8f7;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e2de;border-top:none">
            <p style="font-size:14px;line-height:1.6;margin:0 0 12px">Your booking is confirmed${
              itinerary.name ? `, ${itinerary.name}` : ""
            }! We're excited for your trip.</p>
            ${
              itinerary.pdf_url
                ? `<a href="${itinerary.pdf_url}" style="display:inline-block;background:#dd9e5e;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600">Download Itinerary PDF</a>`
                : ""
            }
          </div>
        </div>
      `,
    })
    .catch((err) => console.error("Resend error:", err));

  return NextResponse.json({ success: true });
}
