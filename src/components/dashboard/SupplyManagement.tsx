
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddSupplyDialog } from '@/components/modals/AddSupplyDialog';
import { useSupplies } from '@/hooks/useSupplies';
import { Plus, Package, AlertTriangle, TrendingDown, Edit, Trash2 } from 'lucide-react';

export const SupplyManagement: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { supplies, isLoading } = useSupplies();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Package className="h-4 w-4" />;
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'out_of_stock':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryImage = (category: string) => {
    const categoryImages = {
      'Seeds': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Fertilizers': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Tools': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Pesticides': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Equipment': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'default': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    };
    return categoryImages[category as keyof typeof categoryImages] || categoryImages.default;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header with Background */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          <div className="relative p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Supply Management</h2>
              <p className="text-green-100 mt-1">Manage your farm supplies efficiently</p>
            </div>
            <Button className="bg-white text-green-600 hover:bg-green-50">
              <Plus className="mr-2 h-4 w-4" />
              Add Supply
            </Button>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading supplies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Background */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        <div className="relative p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Supply Management</h2>
            <p className="text-green-100 mt-1">Manage your farm supplies efficiently</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Supply
          </Button>
        </div>
      </div>

      {supplies.length === 0 ? (
        <Card className="overflow-hidden">
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">No supplies found</h3>
                <p className="text-lg mb-6 opacity-90">
                  Start by adding your first supply item to track your inventory.
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add First Supply
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplies.map((supply) => (
            <Card key={supply.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Card Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getCategoryImage(supply.category)} 
                  alt={supply.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(supply.status)} font-medium`}>
                    {getStatusIcon(supply.status)}
                    <span className="ml-1 capitalize">{supply.status.replace('_', ' ')}</span>
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{supply.name}</h3>
                  <p className="text-sm opacity-90">{supply.category}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Quantity:</span>
                    <span className="font-bold text-lg text-gray-900">{supply.quantity} {supply.unit}</span>
                  </div>
                  
                  {supply.cost_per_unit && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost per unit:</span>
                      <span className="font-semibold text-green-600">${supply.cost_per_unit}</span>
                    </div>
                  )}
                  
                  {supply.supplier && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Supplier:</span>
                      <span className="font-medium text-gray-900">{supply.supplier}</span>
                    </div>
                  )}
                  
                  {supply.low_stock_threshold && supply.low_stock_threshold > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Low stock alert:</span>
                      <span className="font-medium text-orange-600">{supply.low_stock_threshold} {supply.unit}</span>
                    </div>
                  )}
                  
                  {supply.description && (
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-600 block mb-1">Description:</span>
                      <p className="text-sm text-gray-800 leading-relaxed">{supply.description}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-6 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddSupplyDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
};
