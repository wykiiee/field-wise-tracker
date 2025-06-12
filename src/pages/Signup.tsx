
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

const Signup = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our farm inventory management system"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
