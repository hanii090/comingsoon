import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/types/database'

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function POST(request: NextRequest) {
  try {
    // Check if services are available
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI service is not configured' },
        { status: 500 }
      )
    }

    const { businessIdea, userId } = await request.json()

    if (!businessIdea || !userId) {
      return NextResponse.json(
        { error: 'Business idea and user ID are required' },
        { status: 400 }
      )
    }

    const supabase = createServerComponentClient<Database>({ cookies })

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check user's Pro status and plan limits
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', userId)
      .single()

    if (!profile?.is_pro) {
      // Check if free user has already created a plan this month
      const { data: existingPlans, error: plansError } = await supabase
        .from('plans')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

      if (plansError) {
        console.error('Error checking existing plans:', plansError)
      } else if (existingPlans && existingPlans.length >= 1) {
        return NextResponse.json(
          { error: 'Free users can create 1 plan per month. Upgrade to Pro for unlimited plans!' },
          { status: 402 }
        )
      }
    }

    // Generate business plan using OpenAI
    const prompt = `
      You are an expert business consultant. Create a comprehensive business plan for the following startup idea:
      
      "${businessIdea}"
      
      Please provide a detailed business plan in JSON format with the following sections:
      {
        "title": "Business Name/Title",
        "executive_summary": "A compelling 2-3 paragraph executive summary",
        "business_description": "Detailed description of the business and its value proposition",
        "market_analysis": "Target market analysis, size, trends, and opportunities",
        "competitive_analysis": "Analysis of competitors and competitive advantages",
        "marketing_strategy": "Marketing and customer acquisition strategy",
        "operations_plan": "How the business will operate day-to-day",
        "management_team": "Key roles and team structure needed",
        "financial_projections": "Revenue model, costs, and growth projections",
        "funding_requirements": "Capital needs and funding strategy",
        "risk_analysis": "Key risks and mitigation strategies",
        "implementation_timeline": "Major milestones and timeline"
      }
      
      Make the plan specific to the business idea provided. Use realistic numbers and actionable insights.
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert business consultant who creates detailed, actionable business plans for startups. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'Failed to generate business plan' },
        { status: 500 }
      )
    }

    // Parse the AI response
    let planData
    try {
      planData = JSON.parse(aiResponse)
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      planData = {
        title: 'Generated Business Plan',
        executive_summary: aiResponse.slice(0, 500) + '...',
        business_description: 'AI generated comprehensive business plan',
        full_content: aiResponse
      }
    }

    // Save to Supabase using correct column name
    const { data, error } = await supabase
      .from('plans')
      .insert({
        user_id: userId,
        title: planData.title || 'Generated Business Plan',
        content: planData,
        is_public: false
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save business plan' },
        { status: 500 }
      )
    }

    // Send welcome email for first-time users
    try {
      const { data: userPlans } = await supabase
        .from('plans')
        .select('id')
        .eq('user_id', userId)

      if (userPlans && userPlans.length === 1) {
        // This is their first plan, send welcome email
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-onboarding`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
            type: 'welcome'
          })
        })
      }
    } catch (emailError) {
      // Don't fail the main request if email fails
      console.error('Email sending error:', emailError)
    }

    return NextResponse.json({
      success: true,
      plan: data[0],
      message: 'Business plan generated successfully!'
    })

  } catch (error) {
    console.error('Error generating business plan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}