
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

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
      const profile = {
        id: data.id,
        name: data.name || '',
        username: data.username || '',
        email: data.email || '',
        role: data.role as 'farmer' | 'admin' | 'extension_officer'
      };
      
      setUser(profile);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const clearUser = () => {
    setUser(null);
  };

  return {
    user,
    setUser,
    fetchUserProfile,
    clearUser
  };
};
