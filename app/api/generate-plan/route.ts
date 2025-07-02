import { NextRequest, NextResponse } from 'next/server'
import { generateBusinessPlan } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { businessIdea, industry, targetMarket, userId } = await request.json()

    // Validate required fields
    if (!businessIdea || !industry || !targetMarket || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate business plan using OpenAI
    const planContent = await generateBusinessPlan(businessIdea, industry, targetMarket)

    // Create a title from the business idea (first 50 characters)
    const title = businessIdea.length > 50 
      ? businessIdea.substring(0, 47) + '...'
      : businessIdea

    // Parse the plan content into sections
    const sections = {
      businessIdea,
      industry,
      targetMarket,
      content: planContent,
      generatedAt: new Date().toISOString()
    }

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('plans')
      .insert({
        user_id: userId,
        title,
        sections
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving plan to database:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save business plan' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      planId: data.id,
      title: data.title
    })

  } catch (error) {
    console.error('Error generating business plan:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate business plan' },
      { status: 500 }
    )
  }
}