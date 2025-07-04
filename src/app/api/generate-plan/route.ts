import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createSupabaseServerClient } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { businessIdea, industry, targetMarket, fundingGoal } = await request.json()

    if (!businessIdea || !industry) {
      return NextResponse.json(
        { error: 'Business idea and industry are required' },
        { status: 400 }
      )
    }

    // Get user from session
    const supabase = createSupabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const prompt = `Create a comprehensive business plan for the following startup idea:

Business Idea: ${businessIdea}
Industry: ${industry}
Target Market: ${targetMarket || 'Not specified'}
Funding Goal: ${fundingGoal || 'Not specified'}

Please generate a detailed business plan with the following sections:

1. Executive Summary
2. Company Description
3. Market Analysis
4. Organization & Management
5. Product/Service Line
6. Marketing & Sales Strategy
7. Funding Request (if applicable)
8. Financial Projections
9. Implementation Timeline
10. Risk Analysis

Format the response as a JSON object with each section as a key and the content as the value. Make it comprehensive, professional, and investor-ready. Include specific numbers, strategies, and actionable insights where appropriate.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert business consultant and startup advisor. Generate comprehensive, realistic, and actionable business plans that could be presented to investors."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('Failed to generate business plan content')
    }

    let planContent
    try {
      planContent = JSON.parse(generatedContent)
    } catch (error) {
      // If JSON parsing fails, create a structured object
      planContent = {
        'Executive Summary': generatedContent.split('\n').slice(0, 10).join('\n'),
        'Full Content': generatedContent
      }
    }

    // Save to Supabase
    const { data: savedPlan, error: saveError } = await supabase
      .from('plans')
      .insert({
        user_id: session.user.id,
        title: `${businessIdea} - Business Plan`,
        content: {
          ...planContent,
          metadata: {
            industry,
            targetMarket,
            fundingGoal,
            generatedAt: new Date().toISOString()
          }
        }
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving plan:', saveError)
      return NextResponse.json(
        { error: 'Failed to save business plan' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      plan: savedPlan,
      content: planContent
    })

  } catch (error) {
    console.error('Error generating business plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate business plan' },
      { status: 500 }
    )
  }
}