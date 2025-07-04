import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createSupabaseServerClient } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { businessName, industry, targetAudience, brandPersonality } = await request.json()

    if (!businessName || !industry) {
      return NextResponse.json(
        { error: 'Business name and industry are required' },
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

    const prompt = `Create a comprehensive brand identity kit for the following business:

Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience || 'Not specified'}
Brand Personality: ${brandPersonality || 'Professional and trustworthy'}

Please generate a complete brand identity including:

1. Brand Tagline (3-5 memorable options)
2. Brand Mission Statement
3. Brand Vision Statement
4. Core Brand Values (5-7 values)
5. Brand Voice & Tone Guidelines
6. Brand Personality Traits
7. Target Audience Persona
8. Unique Value Proposition
9. Brand Messaging Framework
10. Content Style Guidelines
11. Communication Principles
12. Brand Differentiation Points

Format the response as a detailed JSON object with each section as a key and comprehensive content as the value. Make it professional, memorable, and suitable for investor presentations and marketing materials.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert brand strategist and marketing consultant. Generate comprehensive, professional brand identity kits that help businesses establish strong market presence and connect with their target audience."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 3500,
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('Failed to generate brand identity content')
    }

    let brandContent
    try {
      brandContent = JSON.parse(generatedContent)
    } catch (error) {
      // If JSON parsing fails, create a structured object
      brandContent = {
        'Brand Identity': generatedContent,
        'Generated At': new Date().toISOString()
      }
    }

    // Extract tone for the brands table
    const tone = brandContent['Brand Voice & Tone Guidelines'] || brandContent['Brand Personality Traits'] || 'Professional'
    const values = brandContent['Core Brand Values'] || []
    
    // Convert values to array if it's a string
    let valuesArray: string[] = []
    if (typeof values === 'string') {
      valuesArray = values.split('\n').filter(v => v.trim()).map(v => v.replace(/^\d+\.\s*/, '').trim())
    } else if (Array.isArray(values)) {
      valuesArray = values
    } else if (typeof values === 'object') {
      valuesArray = Object.values(values).filter(v => typeof v === 'string')
    }

    // Save to Supabase
    const { data: savedBrand, error: saveError } = await supabase
      .from('brands')
      .insert({
        user_id: session.user.id,
        name: businessName,
        tone: typeof tone === 'string' ? tone.substring(0, 100) : 'Professional',
        values: valuesArray.slice(0, 10), // Limit to 10 values
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving brand:', saveError)
      return NextResponse.json(
        { error: 'Failed to save brand identity' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      brand: savedBrand,
      content: {
        ...brandContent,
        metadata: {
          businessName,
          industry,
          targetAudience,
          brandPersonality,
          generatedAt: new Date().toISOString()
        }
      }
    })

  } catch (error) {
    console.error('Error generating brand identity:', error)
    return NextResponse.json(
      { error: 'Failed to generate brand identity' },
      { status: 500 }
    )
  }
}