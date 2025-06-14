
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEquipment, CreateEquipmentData } from '@/hooks/useEquipment';

interface AddEquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddEquipmentDialog: React.FC<AddEquipmentDialogProps> = ({ open, onOpenChange }) => {
  const { createEquipment, isCreating } = useEquipment();
  const [formData, setFormData] = useState<CreateEquipmentData>({
    name: '',
    category: '',
    description: '',
    purchase_date: '',
    purchase_cost: undefined,
    status: 'operational',
    last_maintenance_date: '',
    next_maintenance_date: '',
  });

  const categories = [
    'Tractors',
    'Harvesters',
    'Irrigation',
    'Tools',
    'Planting Equipment',
    'Processing Equipment',
    'Other'
  ];

  const statuses = [
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
    { value: 'retired', label: 'Retired' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      return;
    }

    const submitData: CreateEquipmentData = {
      ...formData,
      purchase_cost: formData.purchase_cost || undefined,
      description: formData.description || undefined,
      purchase_date: formData.purchase_date || undefined,
      last_maintenance_date: formData.last_maintenance_date || undefined,
      next_maintenance_date: formData.next_maintenance_date || undefined,
    };

    createEquipment(submitData);

    setFormData({
      name: '',
      category: '',
      description: '',
      purchase_date: '',
      purchase_cost: undefined,
      status: 'operational',
      last_maintenance_date: '',
      next_maintenance_date: '',
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof CreateEquipmentData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter equipment name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchase_cost">Purchase Cost</Label>
              <Input
                id="purchase_cost"
                type="number"
                value={formData.purchase_cost || ''}
                onChange={(e) => handleInputChange('purchase_cost', Number(e.target.value))}
                placeholder="Enter cost"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value as 'operational' | 'maintenance' | 'repair' | 'retired')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <Input
              id="purchase_date"
              type="date"
              value={formData.purchase_date || ''}
              onChange={(e) => handleInputChange('purchase_date', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="last_maintenance_date">Last Maintenance</Label>
              <Input
                id="last_maintenance_date"
                type="date"
                value={formData.last_maintenance_date || ''}
                onChange={(e) => handleInputChange('last_maintenance_date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="next_maintenance_date">Next Maintenance</Label>
              <Input
                id="next_maintenance_date"
                type="date"
                value={formData.next_maintenance_date || ''}
                onChange={(e) => handleInputChange('next_maintenance_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter equipment description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
              {isCreating ? 'Adding...' : 'Add Equipment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
