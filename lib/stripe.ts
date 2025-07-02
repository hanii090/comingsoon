import { loadStripe, Stripe } from '@stripe/stripe-js'
import StripeInstance from 'stripe'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export const stripe = new StripeInstance(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})