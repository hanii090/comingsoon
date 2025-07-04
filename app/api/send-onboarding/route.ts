import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name, type = 'welcome' } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' }, 
        { status: 400 }
      )
    }

    let subject = ''
    let htmlContent = ''

    if (type === 'welcome') {
      subject = 'Welcome to Foundify! 🚀'
      htmlContent = generateWelcomeEmail(name || 'Founder')
    } else if (type === 'pro_upgrade') {
      subject = 'Welcome to Foundify Pro! ⭐'
      htmlContent = generateProUpgradeEmail(name || 'Founder')
    } else {
      return NextResponse.json(
        { error: 'Invalid email type' }, 
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Foundify <onboarding@foundify.app>',
      to: [email],
      subject: subject,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Email sent successfully',
      data 
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

function generateWelcomeEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Foundify</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .header { 
      background: linear-gradient(135deg, #8B5CF6, #EC4899); 
      color: white; 
      padding: 30px; 
      text-align: center; 
      border-radius: 12px 12px 0 0; 
    }
    .content { 
      background: #f8fafc; 
      padding: 30px; 
      border-radius: 0 0 12px 12px; 
    }
    .button { 
      display: inline-block; 
      background: linear-gradient(135deg, #8B5CF6, #EC4899); 
      color: white; 
      padding: 12px 24px; 
      text-decoration: none; 
      border-radius: 8px; 
      margin: 10px 5px; 
      font-weight: 600; 
    }
    .feature { 
      background: white; 
      padding: 20px; 
      margin: 15px 0; 
      border-radius: 8px; 
      border-left: 4px solid #8B5CF6; 
    }
    .footer { 
      text-align: center; 
      color: #666; 
      font-size: 14px; 
      margin-top: 30px; 
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 Welcome to Foundify!</h1>
    <p>Your AI-powered business planning journey starts now</p>
  </div>
  
  <div class="content">
    <h2>Hi ${name},</h2>
    
    <p>We're thrilled to have you join the Foundify community! You're now part of a platform that's helped thousands of founders turn their ideas into investor-ready business plans.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
        🎯 Start Building Your Plan
      </a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" class="button">
        ⭐ Explore Pro Features
      </a>
    </div>
    
    <h3>What you can do with Foundify:</h3>
    
    <div class="feature">
      <h4>🧠 AI Business Plan Generator</h4>
      <p>Create comprehensive business plans with AI-powered insights and market analysis in minutes.</p>
    </div>
    
    <div class="feature">
      <h4>⚡ Brand Identity Kit</h4>
      <p>Generate compelling brand names, taglines, and values that resonate with your audience.</p>
    </div>
    
    <div class="feature">
      <h4>📊 Pitch Deck Builder</h4>
      <p>Create professional investor-ready presentations that tell your startup story effectively.</p>
    </div>
    
    <div class="feature">
      <h4>🔍 Market Research Tools</h4>
      <p>Get deep market analysis and competitive insights to validate your business idea.</p>
    </div>
    
    <h3>Quick Start Tips:</h3>
    <ol>
      <li><strong>Complete your profile</strong> - Add your business details for personalized results</li>
      <li><strong>Start with the AI Business Plan</strong> - Our most popular feature</li>
      <li><strong>Explore Pro features</strong> - Get advanced analytics and export options</li>
      <li><strong>Join our community</strong> - Connect with other founders on our blog</li>
    </ol>
    
    <p>If you have any questions, our team is here to help. Just reply to this email or check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog">startup insights blog</a> for tips and best practices.</p>
    
    <p>Ready to turn your idea into reality? Let's build something amazing together! 🚀</p>
    
    <p>Best,<br>The Foundify Team</p>
  </div>
  
  <div class="footer">
    <p>Foundify - AI-Powered Business Planning<br>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}">foundify.app</a></p>
  </div>
</body>
</html>
`
}

function generateProUpgradeEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Foundify Pro</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .header { 
      background: linear-gradient(135deg, #8B5CF6, #EC4899); 
      color: white; 
      padding: 30px; 
      text-align: center; 
      border-radius: 12px 12px 0 0; 
    }
    .content { 
      background: #f8fafc; 
      padding: 30px; 
      border-radius: 0 0 12px 12px; 
    }
    .button { 
      display: inline-block; 
      background: linear-gradient(135deg, #8B5CF6, #EC4899); 
      color: white; 
      padding: 12px 24px; 
      text-decoration: none; 
      border-radius: 8px; 
      margin: 10px 5px; 
      font-weight: 600; 
    }
    .pro-feature { 
      background: linear-gradient(135deg, #fef3c7, #fde68a); 
      padding: 20px; 
      margin: 15px 0; 
      border-radius: 8px; 
      border-left: 4px solid #f59e0b; 
    }
    .footer { 
      text-align: center; 
      color: #666; 
      font-size: 14px; 
      margin-top: 30px; 
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>⭐ Welcome to Foundify Pro!</h1>
    <p>You now have access to our most powerful features</p>
  </div>
  
  <div class="content">
    <h2>Congratulations ${name}! 🎉</h2>
    
    <p>You've just unlocked the full power of Foundify Pro! You now have access to advanced features that will supercharge your startup planning and give you a competitive edge.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
        🚀 Explore Pro Dashboard
      </a>
    </div>
    
    <h3>Your new Pro features:</h3>
    
    <div class="pro-feature">
      <h4>🔍 AI Competitor Analysis</h4>
      <p>Get deep insights into your competitors' strategies, strengths, and weaknesses with our advanced AI analysis.</p>
    </div>
    
    <div class="pro-feature">
      <h4>📄 PDF & Notion Export</h4>
      <p>Export your business plans, pitch decks, and research as professional PDFs or sync directly with Notion.</p>
    </div>
    
    <div class="pro-feature">
      <h4>♾️ Unlimited Plans</h4>
      <p>Create unlimited business plans, brand kits, and pitch decks. No more limits on your creativity!</p>
    </div>
    
    <div class="pro-feature">
      <h4>📊 Advanced Analytics</h4>
      <p>Track your progress with detailed analytics and insights about your planning journey.</p>
    </div>
    
    <div class="pro-feature">
      <h4>⚡ Priority Support</h4>
      <p>Get faster support responses and access to our expert team for strategic guidance.</p>
    </div>
    
    <h3>Pro Tips to Get Started:</h3>
    <ol>
      <li><strong>Run a competitor analysis</strong> - Use our AI to analyze your competitive landscape</li>
      <li><strong>Export your existing plans</strong> - Download professional PDFs to share with investors</li>
      <li><strong>Create multiple scenarios</strong> - Build conservative, realistic, and optimistic business plans</li>
      <li><strong>Set up Notion integration</strong> - Sync your plans for team collaboration</li>
    </ol>
    
    <p>Remember, your Pro subscription includes everything you need to create investor-ready documentation. We're excited to see what you'll build!</p>
    
    <p>Questions about your Pro features? Just reply to this email - as a Pro member, you get priority support! 🌟</p>
    
    <p>Let's make your startup dreams a reality!</p>
    
    <p>Best,<br>The Foundify Pro Team</p>
  </div>
  
  <div class="footer">
    <p>Foundify Pro - Advanced Business Planning<br>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}">foundify.app</a></p>
  </div>
</body>
</html>
`
}