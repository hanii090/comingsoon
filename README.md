# 🚀 Foundify - AI-Powered Business Planning Assistant

Foundify is a comprehensive, production-ready SaaS platform that helps startup founders turn their ideas into investor-ready business plans using AI. Built with Next.js, Supabase, and OpenAI.

![Foundify Logo](https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Foundify)

## ✨ Features

### 🤖 AI-Powered Business Planning
- **Comprehensive Business Plans**: Generate complete business plans with AI using OpenAI GPT-3.5
- **Market Research**: AI-driven market analysis and competitive insights
- **Brand Identity Creation**: Generate compelling brand names, taglines, and values
- **Pitch Deck Generation**: Create investor-ready presentations
- **Financial Projections**: AI-generated revenue models and growth projections

### 💎 Premium Features (Pro Plan)
- Unlimited business plan generation
- Advanced AI insights and analysis
- Premium templates and customization
- Priority support and assistance
- Export to multiple formats (PDF, Notion)
- Team collaboration (coming soon)

### 🔒 Authentication & Security
- Secure authentication with Supabase Auth
- Row-level security (RLS) for data protection
- Google OAuth integration
- Email verification and password reset

### 💳 Subscription Management
- Stripe integration for payments
- Free and Pro tier management
- Automatic billing and invoicing
- Secure payment processing

### 🎨 Modern UI/UX
- Dark glassmorphism design system
- Fully responsive design
- Smooth animations with Framer Motion
- Custom gradient themes
- Beautiful loading states and transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend & Database
- **Supabase** for database and authentication
- **PostgreSQL** with Row-Level Security
- **OpenAI API** for AI generation
- **Stripe** for payment processing

### Deployment
- **Vercel** for hosting
- **Supabase** for database hosting
- Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Stripe account
- Vercel account (for deployment)

### 1. Clone and Install

```bash
git clone <repository-url>
cd foundify
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

Run the SQL commands in `supabase-schema.sql` in your Supabase SQL editor:

```sql
-- Creates all necessary tables with RLS policies
-- Users, plans, brands, pitch_decks, research tables
-- Automatic user creation triggers
-- Updated timestamp triggers
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

### Core Tables

```sql
users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  isPro BOOLEAN DEFAULT FALSE,
  stripe_id TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  sections JSONB NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

brands (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  business_name TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Security
- Row-Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure API routes with authentication checks

## 🔧 API Routes

### `/api/generate-plan`
- **Method**: POST
- **Purpose**: Generate business plans using OpenAI
- **Body**: `{ businessIdea: string, userId: string }`
- **Response**: Generated plan data

### `/api/create-checkout-session`
- **Method**: POST
- **Purpose**: Create Stripe checkout sessions
- **Body**: `{ priceId: string, successUrl: string, cancelUrl: string }`
- **Response**: Checkout session URL

## 🎨 Design System

### Color Palette
```css
--primary-purple: #8B5CF6
--primary-magenta: #EC4899
--background: #0F0F23
--card: #16213E
--text: #FFFFFF
--text-secondary: #9CA3AF
```

### Components
- **Glassmorphism Cards**: Translucent cards with blur effects
- **Gradient Buttons**: Primary and secondary button variants
- **Animated Icons**: Smooth hover and loading animations
- **Responsive Layout**: Mobile-first design approach

## 📱 Pages Structure

```
app/
├── page.tsx                 # Home page with hero, features, CTA
├── pricing/page.tsx         # Pricing plans with Stripe integration
├── dashboard/page.tsx       # Protected dashboard with AI generation
├── login/page.tsx          # Authentication with Supabase
├── signup/page.tsx         # User registration
├── success/page.tsx        # Post-payment success page
└── api/
    ├── generate-plan/route.ts
    └── create-checkout-session/route.ts
```

## 🔒 Authentication Flow

1. **Sign Up**: Create account with email/password or Google OAuth
2. **Email Verification**: Supabase sends verification email
3. **Login**: Authenticate and create session
4. **Dashboard Access**: Protected routes check authentication
5. **Profile Management**: Update user data and billing

## 💳 Subscription Flow

1. **Free Plan**: Default plan with limited features
2. **Upgrade**: Stripe checkout session creation
3. **Payment**: Secure payment processing
4. **Activation**: Webhook updates user to Pro status
5. **Access**: Unlock premium features

## 🌐 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Build command
npm run build

# Install command
npm install
```

### Environment Variables in Production
Ensure all environment variables are set in your deployment platform:
- Supabase credentials
- OpenAI API key
- Stripe keys
- App URL

## 🔐 Security Best Practices

### Implemented Security
- **RLS Policies**: Database-level security
- **API Route Protection**: Authentication checks
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Sanitized user inputs
- **Rate Limiting**: API abuse prevention (recommended)

### Recommendations
- Set up Stripe webhooks for production
- Implement rate limiting on API routes
- Add CSRF protection
- Monitor API usage and costs
- Regular security audits

## 🚧 Future Enhancements

### Planned Features
- **Team Collaboration**: Multi-user workspaces
- **Advanced Templates**: Industry-specific templates
- **PDF Generation**: Server-side PDF export
- **Notion Integration**: Real-time sync
- **Analytics Dashboard**: Usage metrics
- **Mobile App**: React Native companion

### Technical Improvements
- Server-side rendering optimization
- Advanced caching strategies
- Real-time collaboration features
- Enhanced AI prompts and responses
- Multi-language support

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline comments
- **Issues**: Create GitHub issues for bugs
- **Support**: Contact support for subscription issues
- **Community**: Join our Discord for discussions

### Troubleshooting

**Build Issues**:
```bash
npm run lint
npm run type-check
```

**Database Issues**:
- Check Supabase connection
- Verify RLS policies
- Review SQL schema

**API Issues**:
- Verify environment variables
- Check API key limits
- Review request/response formats

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ for startup founders worldwide**

*Transform your startup ideas into reality with AI-powered business planning.*

