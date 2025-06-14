
import { supabase } from '@/integrations/supabase/client';

export const useAuthActions = () => {
  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login for username:', username);
      
      if (!username.trim() || !password.trim()) {
        return { error: 'Username and password are required' };
      }

      const { data: userData, error: userError } = await supabase
        .rpc('get_user_by_username', { input_username: username.trim().toLowerCase() });

      if (userError) {
        console.error('Error looking up username:', userError);
        return { error: 'Invalid username or password' };
      }

      if (!userData || userData.length === 0) {
        console.error('Username not found');
        return { error: 'Invalid username or password' };
      }

      const userEmail = userData[0].email;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password
      });

      if (error) {
        console.error('Login error:', error);
        return { error: 'Invalid username or password' };
      }

      console.log('Login successful:', data);
      return {};
    } catch (error) {
      console.error('Login exception:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, username: string, email: string, password: string, role: string) => {
    try {
      console.log('Attempting signup for:', email, 'with username:', username, 'and role:', role);
      
      // Validate inputs
      if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
        return { error: 'All fields are required' };
      }

      // Username validation
      const cleanUsername = username.trim().toLowerCase();
      if (cleanUsername.length < 3) {
        return { error: 'Username must be at least 3 characters' };
      }

      if (!/^[a-z0-9_]+$/.test(cleanUsername)) {
        return { error: 'Username can only contain letters, numbers, and underscores' };
      }

      // Check if username already exists
      console.log('Checking if username exists:', cleanUsername);
      const { data: existingUser, error: checkError } = await supabase
        .rpc('get_user_by_username', { input_username: cleanUsername });

      if (checkError) {
        console.error('Error checking username:', checkError);
        return { error: 'An error occurred while checking username availability' };
      }

      if (existingUser && existingUser.length > 0) {
        console.log('Username already exists');
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
        return { error: error.message };
      }

      console.log('Signup response from Supabase:', data);
      
      // Check if user was created successfully
      if (data.user) {
        console.log('User created successfully:', data.user.id);
      } else {
        console.log('No user object in response, but no error either');
      }

      return {};
    } catch (error) {
      console.error('Signup exception:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    console.log('Logging out...');
    await supabase.auth.signOut();
  };

  return {
    login,
    signup,
    logout
  };
};
