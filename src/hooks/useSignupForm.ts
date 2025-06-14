
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
    
    console.log('Starting signup process with data:', {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      role: formData.role
    });
    
    // Client-side validation
    const validationError = validateSignupForm(formData);
    if (validationError) {
      console.log('Validation error:', validationError);
      toast({
        title: "Error",
        description: validationError.message,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log('Calling signup function...');
    
    const { error } = await signup(
      formData.name.trim(),
      formData.username.trim(),
      formData.email.trim(),
      formData.password,
      formData.role
    );
    
    setIsLoading(false);
    
    if (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error,
        variant: "destructive"
      });
    } else {
      console.log('Signup successful!');
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
