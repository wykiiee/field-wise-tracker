
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddSupplyDialog } from '@/components/modals/AddSupplyDialog';
import { useSupplies } from '@/hooks/useSupplies';
import { Plus, Package, AlertTriangle, TrendingDown } from 'lucide-react';

export const SupplyManagement: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { supplies, isLoading } = useSupplies();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Supply Management</h2>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Supply
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading supplies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Supply Management</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Supply
        </Button>
      </div>

      {supplies.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No supplies found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first supply item to track your inventory.
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Supply
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supplies.map((supply) => (
            <Card key={supply.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{supply.name}</CardTitle>
                  <Badge className={getStatusColor(supply.status)}>
                    {getStatusIcon(supply.status)}
                    <span className="ml-1 capitalize">{supply.status.replace('_', ' ')}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{supply.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{supply.quantity} {supply.unit}</span>
                  </div>
                  {supply.cost_per_unit && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cost per unit:</span>
                      <span className="font-medium">${supply.cost_per_unit}</span>
                    </div>
                  )}
                  {supply.supplier && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Supplier:</span>
                      <span className="font-medium">{supply.supplier}</span>
                    </div>
                  )}
                  {supply.low_stock_threshold && supply.low_stock_threshold > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low stock alert:</span>
                      <span className="font-medium">{supply.low_stock_threshold} {supply.unit}</span>
                    </div>
                  )}
                  {supply.description && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Description:</span>
                      <p className="text-sm mt-1">{supply.description}</p>
                    </div>
                  )}
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
