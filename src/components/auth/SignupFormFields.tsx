
import React from 'react';
import { User, Mail } from 'lucide-react';
import { FormFieldWithIcon } from './FormFieldWithIcon';
import { PasswordField } from './PasswordField';
import { RoleSelect } from './RoleSelect';
import { SignupFormData } from '@/hooks/useSignupForm';

interface SignupFormFieldsProps {
  formData: SignupFormData;
  isLoading: boolean;
  onFieldChange: (field: keyof SignupFormData, value: string) => void;
  onUsernameChange: (value: string) => void;
}

export const SignupFormFields: React.FC<SignupFormFieldsProps> = ({
  formData,
  isLoading,
  onFieldChange,
  onUsernameChange
}) => {
  return (
    <div className="space-y-4">
      <FormFieldWithIcon
        id="name"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(e) => onFieldChange('name', e.target.value)}
        disabled={isLoading}
        autoComplete="name"
        icon={User}
      />

      <FormFieldWithIcon
        id="username"
        label="Username"
        placeholder="Choose a unique username"
        value={formData.username}
        onChange={(e) => onUsernameChange(e.target.value)}
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
        onChange={(e) => onFieldChange('email', e.target.value)}
        disabled={isLoading}
        autoComplete="email"
        icon={Mail}
      />
      
      <PasswordField
        id="password"
        label="Password"
        placeholder="Create a password (min 6 characters)"
        value={formData.password}
        onChange={(e) => onFieldChange('password', e.target.value)}
        disabled={isLoading}
        autoComplete="new-password"
        showToggle={true}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <RoleSelect
        value={formData.role}
        onChange={(e) => onFieldChange('role', e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
};
