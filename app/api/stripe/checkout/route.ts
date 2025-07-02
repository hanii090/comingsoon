import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already has a Stripe customer ID
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('stripe_id, isPro')
      .eq('id', userId)
      .single()

    if (userError && userError.code !== 'PGRST116') {
      console.error('Error fetching user:', userError)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // If user is already Pro, redirect to dashboard
    if (userData?.isPro) {
      return NextResponse.json(
        { error: 'User is already Pro' },
        { status: 400 }
      )
    }

    let customerId = userData?.stripe_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          userId,
        },
      })
      customerId = customer.id

      // Update user with Stripe customer ID
      await supabaseAdmin
        .from('users')
        .upsert({
          id: userId,
          email,
          stripe_id: customerId,
          isPro: false
        })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Foundify Pro',
              description: 'Unlimited business plans, pitch decks, market research, and more!',
            },
            unit_amount: 2900, // $29.00
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: session.id })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}