
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSignupForm } from '@/hooks/useSignupForm';
import { SignupFormFields } from './SignupFormFields';

export const SignupForm: React.FC = () => {
  const {
    formData,
    isLoading,
    updateField,
    handleUsernameChange,
    handleSubmit
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SignupFormFields
        formData={formData}
        isLoading={isLoading}
        onFieldChange={updateField}
        onUsernameChange={handleUsernameChange}
      />

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
