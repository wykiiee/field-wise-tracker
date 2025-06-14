
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FormFieldWithIcon } from './FormFieldWithIcon';
import { PasswordField } from './PasswordField';
import { RoleSelect } from './RoleSelect';
import { validateSignupForm, formatUsername } from '@/utils/formValidation';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatUsername(e.target.value);
    setFormData({...formData, username: formattedValue});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <FormFieldWithIcon
          id="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          disabled={isLoading}
          autoComplete="name"
          icon={User}
        />

        <FormFieldWithIcon
          id="username"
          label="Username"
          placeholder="Choose a unique username"
          value={formData.username}
          onChange={handleUsernameChange}
          disabled={isLoading}
          autoComplete="username"
          icon={User}
          helpText="Must be at least 3 characters. Only letters, numbers, and underscores allowed."
        />

        <FormFieldWithIcon
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          disabled={isLoading}
          autoComplete="email"
          icon={Mail}
        />
        
        <PasswordField
          id="password"
          label="Password"
          placeholder="Create a password (min 6 characters)"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          disabled={isLoading}
          autoComplete="new-password"
          showToggle={true}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <RoleSelect
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          disabled={isLoading}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700" 
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <div className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-green-600 hover:text-green-700 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};
