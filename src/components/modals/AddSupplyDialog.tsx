
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupplies, CreateSupplyData } from '@/hooks/useSupplies';

interface AddSupplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSupplyDialog: React.FC<AddSupplyDialogProps> = ({ open, onOpenChange }) => {
  const { createSupply, isCreating } = useSupplies();
  const [formData, setFormData] = useState<CreateSupplyData>({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    cost_per_unit: undefined,
    supplier: '',
    description: '',
    low_stock_threshold: 0,
  });

  const categories = [
    'Fertilizers',
    'Seeds',
    'Pesticides',
    'Tools',
    'Equipment',
    'Irrigation',
    'Other'
  ];

  const units = [
    'kg',
    'bags',
    'liters',
    'pieces',
    'meters',
    'tons',
    'gallons'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.quantity || !formData.unit) {
      return;
    }

    const submitData: CreateSupplyData = {
      ...formData,
      cost_per_unit: formData.cost_per_unit || undefined,
      supplier: formData.supplier || undefined,
      description: formData.description || undefined,
      low_stock_threshold: formData.low_stock_threshold || 0,
    };

    createSupply(submitData);

    // Reset form and close dialog
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      unit: '',
      cost_per_unit: undefined,
      supplier: '',
      description: '',
      low_stock_threshold: 0,
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof CreateSupplyData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Supply Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter item name"
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
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity || ''}
                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                placeholder="Enter quantity"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost per Unit</Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost_per_unit || ''}
                onChange={(e) => handleInputChange('cost_per_unit', Number(e.target.value))}
                placeholder="Enter cost"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier || ''}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
            <Input
              id="low_stock_threshold"
              type="number"
              value={formData.low_stock_threshold || ''}
              onChange={(e) => handleInputChange('low_stock_threshold', Number(e.target.value))}
              placeholder="Enter low stock threshold"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter item description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isCreating}>
              {isCreating ? 'Adding...' : 'Add Supply'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
