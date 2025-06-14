
import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-500" />
      
      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl">
              <Leaf className="h-10 w-10 text-white" />
              <Sparkles className="h-4 w-4 text-white/70 absolute translate-x-3 -translate-y-3" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          {/* Form Content */}
          {children}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/70 bg-black/10 rounded-full px-4 py-2 backdrop-blur-sm">
            🌾 Farm Inventory Management System
          </p>
        </div>
      </div>
    </div>
  );
};
