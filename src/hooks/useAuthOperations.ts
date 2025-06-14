
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

export const useAuthOperations = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string, retryCount = 0): Promise<UserProfile | null> => {
    try {
      console.log('Fetching user profile for:', userId, 'Retry count:', retryCount);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        
        // If profile doesn't exist and we haven't retried too many times, wait and retry
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log('Profile not found, retrying in 2 seconds...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          return fetchUserProfile(userId, retryCount + 1);
        }
        
        return null;
      }

      if (!data) {
        console.log('No profile data found for user:', userId);
        return null;
      }

      console.log('Profile fetched successfully:', data);
      return {
        id: data.id,
        name: data.name || '',
        username: data.username || '',
        email: data.email || '',
        role: data.role as 'farmer' | 'admin' | 'extension_officer'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const handleAuthChange = async (event: string, session: Session | null) => {
    console.log('Auth state changed:', event, session);
    setSession(session);
    
    if (session?.user) {
      console.log('User session found, fetching profile...');
      try {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } catch (error) {
        console.error('Error in handleAuthChange:', error);
        setUser(null);
      }
    } else {
      console.log('No user session, clearing user state');
      setUser(null);
    }
    
    setLoading(false);
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for username:', username);
      
      if (!username.trim() || !password.trim()) {
        setLoading(false);
        return { error: 'Username and password are required' };
      }

      const { data: userData, error: userError } = await supabase
        .rpc('get_user_by_username', { input_username: username.trim().toLowerCase() });

      if (userError) {
        console.error('Error looking up username:', userError);
        setLoading(false);
        return { error: 'Invalid username or password' };
      }

      if (!userData || userData.length === 0) {
        console.error('Username not found');
        setLoading(false);
        return { error: 'Invalid username or password' };
      }

      const userEmail = userData[0].email;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password
      });

      if (error) {
        console.error('Login error:', error);
        setLoading(false);
        return { error: 'Invalid username or password' };
      }

      console.log('Login successful:', data);
      return {};
    } catch (error) {
      console.error('Login exception:', error);
      setLoading(false);
      return { error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, username: string, email: string, password: string, role: string) => {
    try {
      setLoading(true);
      console.log('Attempting signup for:', email, 'with username:', username, 'and role:', role);
      
      // Validate inputs
      if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
        setLoading(false);
        return { error: 'All fields are required' };
      }

      // Username validation
      const cleanUsername = username.trim().toLowerCase();
      if (cleanUsername.length < 3) {
        setLoading(false);
        return { error: 'Username must be at least 3 characters' };
      }

      if (!/^[a-z0-9_]+$/.test(cleanUsername)) {
        setLoading(false);
        return { error: 'Username can only contain letters, numbers, and underscores' };
      }

      // Check if username already exists
      console.log('Checking if username exists:', cleanUsername);
      const { data: existingUser, error: checkError } = await supabase
        .rpc('get_user_by_username', { input_username: cleanUsername });

      if (checkError) {
        console.error('Error checking username:', checkError);
        setLoading(false);
        return { error: 'An error occurred while checking username availability' };
      }

      if (existingUser && existingUser.length > 0) {
        console.log('Username already exists');
        setLoading(false);
        return { error: 'Username is already taken' };
      }
      
      console.log('Username is available, proceeding with signup...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name.trim(),
            username: cleanUsername,
            role
          }
        }
      });

      if (error) {
        console.error('Signup error from Supabase:', error);
        setLoading(false);
        return { error: error.message };
      }

      console.log('Signup response from Supabase:', data);
      
      // Check if user was created successfully
      if (data.user) {
        console.log('User created successfully:', data.user.id);
      } else {
        console.log('No user object in response, but no error either');
      }

      setLoading(false);
      return {};
    } catch (error) {
      console.error('Signup exception:', error);
      setLoading(false);
      return { error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    console.log('Logging out...');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    loading,
    login,
    signup,
    logout,
    handleAuthChange,
    setLoading
  };
};
