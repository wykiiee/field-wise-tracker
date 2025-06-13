
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';

export const InventoryOverview: React.FC = () => {
  const inventoryItems = [
    { name: 'Fertilizer', current: 85, max: 100, unit: 'bags', status: 'good' },
    { name: 'Seeds (Corn)', current: 20, max: 50, unit: 'kg', status: 'low' },
    { name: 'Pesticide', current: 15, max: 40, unit: 'liters', status: 'low' },
    { name: 'Tools', current: 45, max: 50, unit: 'items', status: 'good' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getProgressValue = (current: number, max: number) => {
    return (current / max) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Current Inventory Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventoryItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className={`text-sm ${getStatusColor(item.status)}`}>
                    {item.current}/{item.max} {item.unit}
                  </span>
                </div>
                <Progress 
                  value={getProgressValue(item.current, item.max)} 
                  className={`h-2 ${item.status === 'low' ? 'bg-red-100' : 'bg-green-100'}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Low Stock Alert</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Seeds (Corn) is running low. Only 20kg remaining.
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Stock Warning</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Pesticide levels are below recommended threshold.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Inventory Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Fertilizer Purchase</p>
                <p className="text-sm text-muted-foreground">Added 25 bags to inventory</p>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Equipment Usage</p>
                <p className="text-sm text-muted-foreground">Tractor used for 4 hours</p>
              </div>
              <div className="text-sm text-muted-foreground">Yesterday</div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Seeds Planted</p>
                <p className="text-sm text-muted-foreground">Used 15kg corn seeds</p>
              </div>
              <div className="text-sm text-muted-foreground">3 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
