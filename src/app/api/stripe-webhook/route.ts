import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServerClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseServerClient()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (!userId) {
          console.error('No userId in session metadata')
          break
        }

        // Update user to Pro status
        const { error } = await supabase
          .from('profiles')
          .update({ 
            is_pro: true,
            stripe_customer_id: session.customer as string
          })
          .eq('id', userId)

        if (error) {
          console.error('Error updating user to Pro:', error)
        } else {
          console.log(`User ${userId} upgraded to Pro`)
          
          // Send welcome email for Pro users
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-welcome`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              type: 'pro_upgrade'
            }),
          }).catch(console.error)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Ensure user remains Pro on successful payment
        const { error } = await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('Error maintaining Pro status:', error)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Handle failed payment - could implement grace period
        console.log(`Payment failed for customer ${customerId}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Downgrade user from Pro
        const { error } = await supabase
          .from('profiles')
          .update({ is_pro: false })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('Error downgrading user from Pro:', error)
        } else {
          console.log(`User with customer ${customerId} downgraded from Pro`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}