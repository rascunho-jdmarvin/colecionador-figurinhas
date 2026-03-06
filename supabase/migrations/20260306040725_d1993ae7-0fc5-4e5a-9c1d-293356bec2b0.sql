
-- ENUM TYPES
CREATE TYPE public.app_role AS ENUM ('user', 'establishment', 'admin');
CREATE TYPE public.rarity_type AS ENUM ('common', 'rare', 'legendary');
CREATE TYPE public.trade_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled');

-- UTILITY FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ALBUMS
CREATE TABLE public.albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Albums viewable by everyone" ON public.albums FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage albums" ON public.albums FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_albums_updated_at BEFORE UPDATE ON public.albums FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ALBUM PLAYERS (figurinhas)
CREATE TABLE public.album_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  nickname TEXT,
  country TEXT NOT NULL,
  position TEXT NOT NULL,
  club TEXT,
  rating INTEGER NOT NULL DEFAULT 70,
  rarity rarity_type NOT NULL DEFAULT 'common',
  image_url TEXT,
  sticker_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.album_players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Album players viewable by everyone" ON public.album_players FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage album players" ON public.album_players FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- USER COLLECTIONS
CREATE TABLE public.user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  album_player_id UUID NOT NULL REFERENCES public.album_players(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  collected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, album_player_id)
);
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own collection" ON public.user_collections FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own collection" ON public.user_collections FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collection" ON public.user_collections FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- DAILY PACKS
CREATE TABLE public.daily_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  opened_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cards_received UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, album_id, opened_date)
);
ALTER TABLE public.daily_packs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own packs" ON public.daily_packs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own packs" ON public.daily_packs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- TRADES
CREATE TABLE public.trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  offered_player_id UUID NOT NULL REFERENCES public.album_players(id),
  requested_player_id UUID NOT NULL REFERENCES public.album_players(id),
  status trade_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their trades" ON public.trades FOR SELECT TO authenticated USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "Users can create trades" ON public.trades FOR INSERT TO authenticated WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "Users can update trades they received" ON public.trades FOR UPDATE TO authenticated USING (auth.uid() = to_user_id);
CREATE TRIGGER update_trades_updated_at BEFORE UPDATE ON public.trades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- QUIZ DAILY
CREATE TABLE public.quiz_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_player_id UUID NOT NULL REFERENCES public.album_players(id),
  quiz_date DATE NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  hints JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quiz_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz viewable by everyone" ON public.quiz_daily FOR SELECT TO authenticated USING (true);

-- QUIZ ATTEMPTS
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quiz_daily(id) ON DELETE CASCADE,
  guessed_player_id UUID REFERENCES public.album_players(id),
  is_correct BOOLEAN NOT NULL DEFAULT false,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, quiz_id, attempt_number)
);
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ESTABLISHMENT STICKERS (geo-located)
CREATE TABLE public.establishment_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  nickname TEXT,
  description TEXT,
  discount_text TEXT,
  image_url TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_meters INTEGER NOT NULL DEFAULT 500,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.establishment_stickers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view active stickers" ON public.establishment_stickers FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Establishments can manage own stickers" ON public.establishment_stickers FOR ALL TO authenticated USING (auth.uid() = establishment_user_id AND public.has_role(auth.uid(), 'establishment'));
CREATE TRIGGER update_establishment_stickers_updated_at BEFORE UPDATE ON public.establishment_stickers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'user'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
