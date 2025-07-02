import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateBusinessPlan = async (businessIdea: string, industry: string, targetMarket: string) => {
  const prompt = `Generate a comprehensive business plan for the following startup idea:
  
Business Idea: ${businessIdea}
Industry: ${industry}
Target Market: ${targetMarket}

Please structure the business plan with the following sections:

1. Executive Summary
2. Business Description
3. Market Analysis
4. Organization & Management
5. Service or Product Line
6. Marketing & Sales Strategy
7. Funding Request
8. Financial Projections
9. Implementation Timeline
10. Risk Analysis

Make the plan detailed, professional, and actionable. Focus on practical steps the founder can take to launch their startup.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert business advisor and startup mentor with 20 years of experience helping founders create successful business plans."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || 'Failed to generate business plan'
  } catch (error) {
    console.error('Error generating business plan:', error)
    throw new Error('Failed to generate business plan')
  }
}