import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

async function upsertSubscription(row: {
  email: string;
  name?: string | null;
  tier: string;
  status: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id?: string | null;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
}) {
  const { error } = await supabaseAdmin
    .from("ac_subscriptions")
    .upsert(
      { ...row, updated_at: new Date().toISOString() },
      { onConflict: "stripe_subscription_id" },
    );
  if (error) console.error("Supabase upsert error (ac_subscriptions):", error.message);
}

export async function POST(req: NextRequest) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Billing is not configured yet" }, { status: 503 });
  }

  const stripe = getStripeClient();
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription" || !session.subscription || !session.customer) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const customer = await stripe.customers.retrieve(session.customer as string);
      const email = "email" in customer ? customer.email : null;
      if (!email) break;

      await upsertSubscription({
        email,
        name: "name" in customer ? customer.name : null,
        tier: session.metadata?.plan ?? "basic",
        status: subscription.status,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        stripe_price_id: subscription.items.data[0]?.price.id ?? null,
        current_period_end: subscription.items.data[0]?.current_period_end
          ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
          : null,
        cancel_at_period_end: subscription.cancel_at_period_end,
      });
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { error } = await supabaseAdmin
        .from("ac_subscriptions")
        .update({
          status: event.type === "customer.subscription.deleted" ? "canceled" : subscription.status,
          current_period_end: subscription.items.data[0]?.current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
            : null,
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
      if (error) console.error("Supabase update error (ac_subscriptions):", error.message);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId =
        typeof invoice.parent?.subscription_details?.subscription === "string"
          ? invoice.parent.subscription_details.subscription
          : invoice.parent?.subscription_details?.subscription?.id;
      if (!subscriptionId) break;

      const { error } = await supabaseAdmin
        .from("ac_subscriptions")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscriptionId);
      if (error) console.error("Supabase update error (ac_subscriptions):", error.message);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ success: true });
}
