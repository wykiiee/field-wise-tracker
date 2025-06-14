
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useUserProfile } from './useUserProfile';
import { useAuthActions } from './useAuthActions';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, fetchUserProfile, clearUser } = useUserProfile();
  const { login: performLogin, signup: performSignup, logout: performLogout } = useAuthActions();

  const handleAuthChange = async (event: string, session: Session | null) => {
    console.log('Auth state changed:', event, session);
    setSession(session);
    
    if (session?.user) {
      console.log('User session found, fetching profile...');
      try {
        await fetchUserProfile(session.user.id);
      } catch (error) {
        console.error('Error in handleAuthChange:', error);
        clearUser();
      }
    } else {
      console.log('No user session, clearing user state');
      clearUser();
    }
    
    setLoading(false);
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    const result = await performLogin(username, password);
    setLoading(false);
    return result;
  };

  const signup = async (name: string, username: string, email: string, password: string, role: string) => {
    setLoading(true);
    const result = await performSignup(name, username, email, password, role);
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await performLogout();
    clearUser();
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
