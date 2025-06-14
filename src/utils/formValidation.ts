
export interface ValidationError {
  field: string;
  message: string;
}

export const validateSignupForm = (formData: {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationError | null => {
  // Check required fields
  if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
    return { field: 'general', message: 'Please fill in all fields' };
  }

  // Password match validation
  if (formData.password !== formData.confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }

  // Password length validation
  if (formData.password.length < 6) {
    return { field: 'password', message: 'Password must be at least 6 characters' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }

  return null;
};

export const formatUsername = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9_]/g, '');
};
