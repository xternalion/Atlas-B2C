import Stripe from "stripe";

export type BillingPlan = "basic" | "pro";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getPriceIdForPlan(plan: BillingPlan): string | null {
  const map: Record<BillingPlan, string | undefined> = {
    basic: process.env.STRIPE_PRICE_BASIC,
    pro: process.env.STRIPE_PRICE_PRO,
  };
  return map[plan] ?? null;
}
