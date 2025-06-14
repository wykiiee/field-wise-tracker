
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSupplies } from '@/hooks/useSupplies';
import { Package, AlertTriangle, TrendingDown, DollarSign, Bell } from 'lucide-react';

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

  const lowStockSupplies = supplies.filter(s => s.status === 'low_stock');
  const outOfStockSupplies = supplies.filter(s => s.status === 'out_of_stock');

  return (
    <div className="space-y-6">
      {/* Hero Section with Background Image */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        <div className="relative p-8">
          <h2 className="text-3xl font-bold mb-2">Farm Inventory Overview</h2>
          <p className="text-green-100">Monitor your farm supplies and equipment efficiently</p>
        </div>
      </div>

      {/* Alert Notifications */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="space-y-4">
          {outOfStockCount > 0 && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800 font-semibold">
                🚨 Urgent: Items Out of Stock
              </AlertTitle>
              <AlertDescription className="text-red-700">
                <div className="mt-2">
                  <p className="font-medium mb-2">{outOfStockCount} items need immediate restocking:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {outOfStockSupplies.slice(0, 4).map((supply) => (
                      <div key={supply.id} className="bg-red-100 p-2 rounded-lg">
                        <span className="font-medium">{supply.name}</span>
                        <span className="text-sm ml-2">({supply.category})</span>
                      </div>
                    ))}
                  </div>
                  {outOfStockSupplies.length > 4 && (
                    <p className="text-sm mt-2">+{outOfStockSupplies.length - 4} more items</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {lowStockCount > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Bell className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800 font-semibold">
                ⚠️ Low Stock Alert
              </AlertTitle>
              <AlertDescription className="text-yellow-700">
                <div className="mt-2">
                  <p className="font-medium mb-2">{lowStockCount} items running low:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {lowStockSupplies.slice(0, 4).map((supply) => (
                      <div key={supply.id} className="bg-yellow-100 p-2 rounded-lg">
                        <span className="font-medium">{supply.name}</span>
                        <span className="text-sm ml-2">({supply.quantity} {supply.unit} left)</span>
                      </div>
                    ))}
                  </div>
                  {lowStockSupplies.length > 4 && (
                    <p className="text-sm mt-2">+{lowStockSupplies.length - 4} more items</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Supplies</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{totalSupplies}</div>
            <p className="text-xs text-blue-600 mt-1">
              {inStockCount} in stock
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Low Stock Items</CardTitle>
            <div className="p-2 bg-yellow-500 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{lowStockCount}</div>
            <p className="text-xs text-yellow-600 mt-1">
              Need restocking
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Out of Stock</CardTitle>
            <div className="p-2 bg-red-500 rounded-lg">
              <TrendingDown className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">{outOfStockCount}</div>
            <p className="text-xs text-red-600 mt-1">
              Immediate attention needed
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Value</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1">
              Current inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Supplies with Background */}
      <Card className="overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          <CardHeader className="relative">
            <CardTitle className="text-xl text-gray-800">Recently Added Supplies</CardTitle>
          </CardHeader>
        </div>
        <CardContent>
          {recentSupplies.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-muted-foreground">No supplies added yet</p>
              <p className="text-sm text-gray-500 mt-1">Start adding supplies to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSupplies.map((supply, index) => (
                <div key={supply.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{supply.name}</p>
                      <p className="text-sm text-gray-500">{supply.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{supply.quantity} {supply.unit}</p>
                    <p className="text-sm text-gray-500">
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
