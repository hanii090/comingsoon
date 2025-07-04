-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create brands table
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    tone TEXT NOT NULL,
    values TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create pitch decks table
CREATE TABLE IF NOT EXISTS public.pitch_decks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slides JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create market research table
CREATE TABLE IF NOT EXISTS public.research (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    industry TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create competitors table
CREATE TABLE IF NOT EXISTS public.competitors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    industry TEXT NOT NULL,
    list JSONB NOT NULL,
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

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

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
CREATE POLICY "Users can view own competitors" ON public.competitors
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own competitors" ON public.competitors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own competitors" ON public.competitors
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own competitors" ON public.competitors
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plans_user_id ON public.plans(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_created_at ON public.plans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON public.brands(user_id);
CREATE INDEX IF NOT EXISTS idx_brands_created_at ON public.brands(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pitch_decks_user_id ON public.pitch_decks(user_id);
CREATE INDEX IF NOT EXISTS idx_research_user_id ON public.research(user_id);
CREATE INDEX IF NOT EXISTS idx_competitors_user_id ON public.competitors(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);

-- Enable realtime for all tables (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.brands;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pitch_decks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.research;
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitors;