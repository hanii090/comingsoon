-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    is_pro BOOLEAN DEFAULT FALSE,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);

-- Create business plans table
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create brands table
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create pitch decks table
CREATE TABLE IF NOT EXISTS public.pitch_decks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create market research table
CREATE TABLE IF NOT EXISTS public.research (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'swot', 'tam', 'market_analysis'
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create competitors table
CREATE TABLE IF NOT EXISTS public.competitors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    business_name TEXT NOT NULL,
    analysis JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    referred_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, referred_user_id)
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pitch_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND email = 'admin@foundify.app'
        )
    );

-- Create policies for plans table
CREATE POLICY "Users can view own plans" ON public.plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans" ON public.plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans" ON public.plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans" ON public.plans
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for brands table
CREATE POLICY "Users can view own brands" ON public.brands
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brands" ON public.brands
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brands" ON public.brands
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brands" ON public.brands
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for pitch_decks table
CREATE POLICY "Users can view own pitch decks" ON public.pitch_decks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pitch decks" ON public.pitch_decks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pitch decks" ON public.pitch_decks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pitch decks" ON public.pitch_decks
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for research table
CREATE POLICY "Users can view own research" ON public.research
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own research" ON public.research
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own research" ON public.research
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own research" ON public.research
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for competitors table
CREATE POLICY "Pro users can view own competitors" ON public.competitors
    FOR SELECT USING (
        auth.uid() = user_id AND EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true
        )
    );

CREATE POLICY "Pro users can insert own competitors" ON public.competitors
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true
        )
    );

CREATE POLICY "Pro users can update own competitors" ON public.competitors
    FOR UPDATE USING (
        auth.uid() = user_id AND EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true
        )
    );

CREATE POLICY "Pro users can delete own competitors" ON public.competitors
    FOR DELETE USING (
        auth.uid() = user_id AND EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true
        )
    );

-- Create policies for referrals table
CREATE POLICY "Users can view referrals they made" ON public.referrals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view referrals they received" ON public.referrals
    FOR SELECT USING (auth.uid() = referred_user_id);

CREATE POLICY "Users can insert referrals" ON public.referrals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for blog posts table
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND email = 'admin@foundify.app'
        )
    );

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER set_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_plans
    BEFORE UPDATE ON public.plans
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_brands
    BEFORE UPDATE ON public.brands
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_pitch_decks
    BEFORE UPDATE ON public.pitch_decks
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_research
    BEFORE UPDATE ON public.research
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_competitors
    BEFORE UPDATE ON public.competitors
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_referrals
    BEFORE UPDATE ON public.referrals
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at_blog_posts
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plans_user_id ON public.plans(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_created_at ON public.plans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON public.brands(user_id);
CREATE INDEX IF NOT EXISTS idx_brands_created_at ON public.brands(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pitch_decks_user_id ON public.pitch_decks(user_id);
CREATE INDEX IF NOT EXISTS idx_research_user_id ON public.research(user_id);
CREATE INDEX IF NOT EXISTS idx_research_type ON public.research(type);
CREATE INDEX IF NOT EXISTS idx_competitors_user_id ON public.competitors(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_user_id ON public.referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON public.referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);

-- Enable realtime for all tables (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.brands;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pitch_decks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.research;
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;

-- Analytics function for admin dashboard
CREATE OR REPLACE FUNCTION public.get_analytics_data()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_users', (SELECT COUNT(*) FROM public.profiles),
        'pro_users', (SELECT COUNT(*) FROM public.profiles WHERE is_pro = true),
        'total_plans', (SELECT COUNT(*) FROM public.plans),
        'total_brands', (SELECT COUNT(*) FROM public.brands),
        'total_pitch_decks', (SELECT COUNT(*) FROM public.pitch_decks),
        'total_referrals', (SELECT COUNT(*) FROM public.referrals),
        'users_this_month', (
            SELECT COUNT(*) FROM public.profiles 
            WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
        ),
        'plans_this_month', (
            SELECT COUNT(*) FROM public.plans 
            WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
        ),
        'most_active_users', (
            SELECT json_agg(
                json_build_object(
                    'email', p.email,
                    'plan_count', u.plan_count,
                    'brand_count', u.brand_count
                )
            )
            FROM (
                SELECT 
                    user_id,
                    COUNT(plans.id) AS plan_count,
                    COUNT(brands.id) AS brand_count
                FROM public.profiles
                LEFT JOIN public.plans ON public.profiles.id = public.plans.user_id
                LEFT JOIN public.brands ON public.profiles.id = public.brands.user_id
                GROUP BY user_id
                ORDER BY plan_count + brand_count DESC
                LIMIT 10
            ) u
            JOIN public.profiles p ON p.id = u.user_id
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users (admin check in application layer)
GRANT EXECUTE ON FUNCTION public.get_analytics_data() TO authenticated;