
-- Add username column to profiles table
ALTER TABLE public.profiles ADD COLUMN username TEXT;

-- Create unique constraint on username
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_unique UNIQUE (username);

-- Create index for better performance on username lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);

-- Update the handle_new_user function to include username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'farmer'),
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$;

-- Create a function to get user by username for authentication
CREATE OR REPLACE FUNCTION public.get_user_by_username(input_username TEXT)
RETURNS TABLE(user_id UUID, email TEXT, name TEXT, role TEXT)
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT id, email, name, role 
  FROM public.profiles 
  WHERE username = input_username;
$$;
