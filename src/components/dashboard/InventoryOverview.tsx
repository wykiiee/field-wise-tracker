
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupplies } from '@/hooks/useSupplies';
import { useEquipment } from '@/hooks/useEquipment';
import { Badge } from '@/components/ui/badge';
import { Package, Wrench, TrendingUp, AlertTriangle } from 'lucide-react';

export const InventoryOverview: React.FC = () => {
  const { supplies, isLoading: suppliesLoading } = useSupplies();
  const { equipment, isLoading: equipmentLoading } = useEquipment();

  const isLoading = suppliesLoading || equipmentLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentSupplies = supplies?.slice(0, 5) || [];
  const recentEquipment = equipment?.slice(0, 5) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Inventory Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recent Supplies */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Recent Supplies
          </h4>
          <div className="space-y-2">
            {recentSupplies.length > 0 ? (
              recentSupplies.map((supply) => (
                <div key={supply.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{supply.name}</p>
                    <p className="text-sm text-gray-600">{supply.category} • {supply.quantity} {supply.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      supply.status === 'in_stock' ? 'default' : 
                      supply.status === 'low_stock' ? 'secondary' : 'destructive'
                    }>
                      {supply.status.replace('_', ' ')}
                    </Badge>
                    {supply.status !== 'in_stock' && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No supplies found. Add your first supply to get started!</p>
            )}
          </div>
        </div>

        {/* Recent Equipment */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Recent Equipment
          </h4>
          <div className="space-y-2">
            {recentEquipment.length > 0 ? (
              recentEquipment.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      item.status === 'operational' ? 'default' : 
                      item.status === 'maintenance' ? 'secondary' : 'destructive'
                    }>
                      {item.status}
                    </Badge>
                    {item.status !== 'operational' && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No equipment found. Add your first equipment to get started!</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{supplies?.length || 0}</div>
            <p className="text-sm text-gray-600">Total Supplies</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{equipment?.length || 0}</div>
            <p className="text-sm text-gray-600">Total Equipment</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
