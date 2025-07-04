import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServerClient } from '@/lib/supabase'
import { getBaseUrl } from '@/lib/utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    // Get user from session
    const supabase = createSupabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user already has Pro
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro, stripe_customer_id')
      .eq('id', session.user.id)
      .single()

    if (profile?.is_pro) {
      return NextResponse.json(
        { error: 'User already has Pro subscription' },
        { status: 400 }
      )
    }

    const baseUrl = getBaseUrl()

    // Create or retrieve Stripe customer
    let customerId = profile?.stripe_customer_id
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email!,
        metadata: {
          userId: session.user.id,
        },
      })
      customerId = customer.id

      // Update profile with Stripe customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', session.user.id)
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Foundify Pro',
              description: 'Unlimited business plans, advanced AI features, PDF export, and more',
              images: [`${baseUrl}/og.png`],
            },
            unit_amount: 2900, // $29.00 in cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
    })

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}