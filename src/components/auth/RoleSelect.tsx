
import React from 'react';
import { Label } from '@/components/ui/label';

interface RoleSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role">Role</Label>
      <select
        id="role"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="farmer">Farmer</option>
        <option value="admin">Admin</option>
        <option value="extension_officer">Extension Officer</option>
      </select>
    </div>
  );
};
