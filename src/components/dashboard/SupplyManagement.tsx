
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AddSupplyDialog } from '@/components/modals/AddSupplyDialog';
import { Package, Plus, Search, Edit, Trash2 } from 'lucide-react';

export const SupplyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const supplies = [
    { id: 1, name: 'Organic Fertilizer', category: 'Fertilizers', quantity: 85, unit: 'bags', cost: 25.50, status: 'In Stock' },
    { id: 2, name: 'Corn Seeds', category: 'Seeds', quantity: 20, unit: 'kg', cost: 15.00, status: 'Low Stock' },
    { id: 3, name: 'Insecticide Spray', category: 'Pesticides', quantity: 15, unit: 'liters', cost: 45.00, status: 'Low Stock' },
    { id: 4, name: 'Garden Tools Set', category: 'Tools', quantity: 12, unit: 'sets', cost: 75.00, status: 'In Stock' },
    { id: 5, name: 'Irrigation Pipes', category: 'Equipment', quantity: 50, unit: 'meters', cost: 8.50, status: 'In Stock' },
  ];

  const filteredSupplies = supplies.filter(supply =>
    supply.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supply.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Low Stock': return 'destructive';
      case 'Out of Stock': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search supplies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Supply
        </Button>
      </div>

      {/* Supplies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupplies.map((supply) => (
          <Card key={supply.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">{supply.name}</CardTitle>
                </div>
                <Badge variant={getStatusBadgeVariant(supply.status)}>
                  {supply.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium">{supply.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="text-sm font-medium">{supply.quantity} {supply.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cost per unit</span>
                  <span className="text-sm font-medium">${supply.cost}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSupplies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No supplies found matching your search.</p>
          </CardContent>
        </Card>
      )}

      <AddSupplyDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};
