
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'farmer' | 'admin' | 'extension_officer';
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, username: string, email: string, password: string, role: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        .single();

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
        if (profile) {
          console.log('Setting user profile:', profile);
          setUser(profile);
        } else {
          console.log('No profile found for user');
          setUser(null);
        }
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

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        console.log('Initial session check:', session);
        await handleAuthChange('INITIAL_SESSION', session);
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for username:', username);
      
      // First, get the user's email from their username
      const { data: userData, error: userError } = await supabase
        .rpc('get_user_by_username', { input_username: username });

      if (userError || !userData || userData.length === 0) {
        console.error('Username not found:', userError);
        setLoading(false);
        return { error: 'Invalid username or password' };
      }

      const userEmail = userData[0].email;
      
      // Now authenticate with email and password
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
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            username,
            role
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        setLoading(false);
        return { error: error.message };
      }

      console.log('Signup successful:', data);
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

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
