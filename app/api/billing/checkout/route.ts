import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getPriceIdForPlan, isStripeConfigured, type BillingPlan } from "@/lib/stripe";
import { config } from "@/lib/config";

const VALID_PLANS: BillingPlan[] = ["basic", "pro"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { plan, email, name } = body as { plan: string; email: string; name?: string };

  if (!plan || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_PLANS.includes(plan as BillingPlan)) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Billing is not configured yet" }, { status: 503 });
  }

  const priceId = getPriceIdForPlan(plan as BillingPlan);
  if (!priceId) {
    return NextResponse.json({ error: "This plan is not available for checkout yet" }, { status: 503 });
  }

  const stripe = getStripeClient();

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer =
      customers.data[0] ??
      (await stripe.customers.create({ email, name: name || undefined }));

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${config.appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.appUrl}/billing/cancel`,
      metadata: { plan },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 });
  }
}
