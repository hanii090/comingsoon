import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { userId, referralCode } = await request.json()
    
    if (!userId || !referralCode) {
      return NextResponse.json(
        { error: 'Missing userId or referralCode' }, 
        { status: 400 }
      )
    }

    const supabase = createServerComponentClient({ cookies })
    
    // Check if referral code is valid (refers to existing user)
    const { data: referrer, error: referrerError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', referralCode)
      .single()
    
    if (referrerError || !referrer) {
      return NextResponse.json(
        { error: 'Invalid referral code' }, 
        { status: 400 }
      )
    }

    // Check if this referral already exists
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('id')
      .eq('user_id', referralCode)
      .eq('referred_user_id', userId)
      .single()

    if (existingReferral) {
      return NextResponse.json(
        { message: 'Referral already tracked' }, 
        { status: 200 }
      )
    }

    // Create the referral record
    const { error: insertError } = await supabase
      .from('referrals')
      .insert({
        user_id: referralCode,
        referred_user_id: userId
      })

    if (insertError) {
      console.error('Error creating referral:', insertError)
      return NextResponse.json(
        { error: 'Failed to track referral' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Referral tracked successfully' 
    })

  } catch (error) {
    console.error('Referral tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}