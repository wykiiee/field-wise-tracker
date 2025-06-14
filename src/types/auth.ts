
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'farmer' | 'admin' | 'extension_officer';
}

export interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, username: string, email: string, password: string, role: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}
