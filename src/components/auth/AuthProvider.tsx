
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthOperations } from '@/hooks/useAuthOperations';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authOperations = useAuthOperations();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(authOperations.handleAuthChange);

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          authOperations.setLoading(false);
          return;
        }
        
        console.log('Initial session check:', session);
        await authOperations.handleAuthChange('INITIAL_SESSION', session);
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        authOperations.setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authOperations}>
      {children}
    </AuthContext.Provider>
  );
};
