import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createSupabaseServerClient } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { industry, businessIdea, targetMarket } = await request.json()

    if (!industry) {
      return NextResponse.json(
        { error: 'Industry is required' },
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

    // Check if user is Pro (competitor analysis is Pro-only feature)
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', session.user.id)
      .single()

    if (!profile?.is_pro) {
      return NextResponse.json(
        { error: 'Competitor analysis is a Pro feature. Please upgrade your account.' },
        { status: 403 }
      )
    }

    const prompt = `Analyze the competitive landscape for a business in the ${industry} industry.

Business Context:
- Industry: ${industry}
- Business Idea: ${businessIdea || 'Not specified'}
- Target Market: ${targetMarket || 'Not specified'}

Please provide a comprehensive competitor analysis including:

1. Top 5 Direct Competitors
2. Top 3 Indirect Competitors
3. Market Leaders Analysis
4. Competitive Advantages & Weaknesses
5. Market Positioning Map
6. Pricing Analysis
7. Marketing Strategy Comparison
8. SWOT Analysis for each major competitor
9. Market Gaps & Opportunities
10. Competitive Strategy Recommendations

For each competitor, include:
- Company name and website
- Founded year and size
- Key products/services
- Target market
- Pricing model
- Strengths and weaknesses
- Market share (if available)
- Recent developments

Format the response as a detailed JSON object with proper structure for easy parsing and display.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a senior market research analyst with expertise in competitive intelligence. Provide detailed, accurate, and actionable competitor analysis based on real market data and insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
      max_tokens: 4000,
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('Failed to generate competitor analysis')
    }

    let analysisContent
    try {
      analysisContent = JSON.parse(generatedContent)
    } catch (error) {
      // If JSON parsing fails, create a structured object
      analysisContent = {
        'Competitor Analysis': generatedContent,
        'Generated At': new Date().toISOString()
      }
    }

    // Save to Supabase
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('competitors')
      .insert({
        user_id: session.user.id,
        industry,
        list: {
          ...analysisContent,
          metadata: {
            businessIdea,
            targetMarket,
            generatedAt: new Date().toISOString()
          }
        }
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving competitor analysis:', saveError)
      return NextResponse.json(
        { error: 'Failed to save competitor analysis' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      analysis: savedAnalysis,
      content: analysisContent
    })

  } catch (error) {
    console.error('Error generating competitor analysis:', error)
    return NextResponse.json(
      { error: 'Failed to generate competitor analysis' },
      { status: 500 }
    )
  }
}