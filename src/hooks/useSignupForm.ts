
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { validateSignupForm, formatUsername } from '@/utils/formValidation';

export interface SignupFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const useSignupForm = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateField = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUsernameChange = (value: string) => {
    const formattedValue = formatUsername(value);
    updateField('username', formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validationError = validateSignupForm(formData);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError.message,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signup(
      formData.name.trim(),
      formData.username.trim(),
      formData.email.trim(),
      formData.password,
      formData.role
    );
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome!",
        description: "Please check your email to confirm your account",
      });
      navigate('/login');
    }
  };

  return {
    formData,
    isLoading,
    updateField,
    handleUsernameChange,
    handleSubmit
  };
};
