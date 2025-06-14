
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupplies } from '@/hooks/useSupplies';
import { Package, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

export const InventoryOverview: React.FC = () => {
  const { supplies, isLoading } = useSupplies();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading inventory overview...</p>
      </div>
    );
  }

  const totalSupplies = supplies.length;
  const inStockCount = supplies.filter(s => s.status === 'in_stock').length;
  const lowStockCount = supplies.filter(s => s.status === 'low_stock').length;
  const outOfStockCount = supplies.filter(s => s.status === 'out_of_stock').length;
  
  const totalValue = supplies.reduce((sum, supply) => {
    return sum + (supply.cost_per_unit ? supply.quantity * supply.cost_per_unit : 0);
  }, 0);

  const recentSupplies = supplies
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Overview</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Supplies</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSupplies}</div>
            <p className="text-xs text-muted-foreground">
              {inStockCount} in stock
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention needed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Supplies */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Added Supplies</CardTitle>
        </CardHeader>
        <CardContent>
          {recentSupplies.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No supplies added yet</p>
          ) : (
            <div className="space-y-3">
              {recentSupplies.map((supply) => (
                <div key={supply.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{supply.name}</p>
                    <p className="text-sm text-muted-foreground">{supply.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{supply.quantity} {supply.unit}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(supply.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
