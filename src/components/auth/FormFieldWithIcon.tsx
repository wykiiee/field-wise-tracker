
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

interface FormFieldWithIconProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  icon: LucideIcon;
  helpText?: string;
}

export const FormFieldWithIcon: React.FC<FormFieldWithIconProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  autoComplete,
  icon: Icon,
  helpText
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="pl-10"
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};
