import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userId, type = 'signup' } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseServerClient()
    
    // Get user data
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, is_pro')
      .eq('id', userId)
      .single()

    if (!profile?.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 404 }
      )
    }

    const isProUpgrade = type === 'pro_upgrade'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://foundify.com'

    const emailContent = isProUpgrade ? {
      subject: '🎉 Welcome to Foundify Pro!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); padding: 2px; border-radius: 12px;">
          <div style="background: #0F0F23; padding: 40px; border-radius: 10px; color: #FFFFFF;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 28px;">Welcome to Foundify Pro! 🚀</h1>
            </div>
            
            <p style="color: #9CA3AF; font-size: 16px; line-height: 1.6;">
              Congratulations! You've unlocked the full power of AI-driven business planning.
            </p>
            
            <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC4899; margin-top: 0;">What's now available to you:</h3>
              <ul style="color: #9CA3AF; line-height: 1.8;">
                <li>✅ Unlimited business plans</li>
                <li>✅ Advanced AI competitor analysis</li>
                <li>✅ PDF & Notion export</li>
                <li>✅ Comprehensive pitch deck generator</li>
                <li>✅ Financial projections & market research</li>
                <li>✅ Priority support</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${appUrl}/dashboard" style="background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Start Building Your Empire
              </a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; margin-top: 30px;">
              Need help getting started? Reply to this email or visit our <a href="${appUrl}/help" style="color: #8B5CF6;">help center</a>.
            </p>
            
            <div style="border-top: 1px solid #374151; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                Foundify - AI-Powered Business Planning<br>
                <a href="${appUrl}" style="color: #8B5CF6; text-decoration: none;">foundify.com</a>
              </p>
            </div>
          </div>
        </div>
      `
    } : {
      subject: '🎯 Welcome to Foundify - Let\'s Build Your Business Plan!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); padding: 2px; border-radius: 12px;">
          <div style="background: #0F0F23; padding: 40px; border-radius: 10px; color: #FFFFFF;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 28px;">Welcome to Foundify! 🎯</h1>
            </div>
            
            <p style="color: #9CA3AF; font-size: 16px; line-height: 1.6;">
              You're just moments away from creating your first AI-generated business plan. Let's turn your startup idea into reality!
            </p>
            
            <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC4899; margin-top: 0;">Get started in 3 simple steps:</h3>
              <ol style="color: #9CA3AF; line-height: 1.8;">
                <li>📝 Describe your business idea</li>
                <li>🤖 Let our AI create your business plan</li>
                <li>📊 Review, edit, and share with investors</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${appUrl}/dashboard" style="background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Create Your First Plan
              </a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px;">
              <strong>Tip:</strong> Start with a clear, specific business idea for the best results. Our AI works best when you provide details about your target market and industry.
            </p>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: rgba(236, 72, 153, 0.1); border-radius: 8px;">
              <p style="color: #EC4899; font-weight: bold; margin: 0 0 10px 0;">🔥 Ready for more advanced features?</p>
              <p style="color: #9CA3AF; font-size: 14px; margin: 0 0 15px 0;">Upgrade to Pro for unlimited plans, competitor analysis, and PDF export.</p>
              <a href="${appUrl}/pricing" style="color: #8B5CF6; text-decoration: none; font-weight: bold;">View Pro Features →</a>
            </div>
            
            <div style="border-top: 1px solid #374151; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                Foundify - AI-Powered Business Planning<br>
                <a href="${appUrl}" style="color: #8B5CF6; text-decoration: none;">foundify.com</a>
              </p>
            </div>
          </div>
        </div>
      `
    }

    const { data, error } = await resend.emails.send({
      from: 'Foundify <hello@foundify.com>',
      to: [profile.email],
      subject: emailContent.subject,
      html: emailContent.html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    })

  } catch (error) {
    console.error('Error in send-welcome API:', error)
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    )
  }
}