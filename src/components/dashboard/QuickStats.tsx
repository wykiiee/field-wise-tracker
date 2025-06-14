
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, Wrench, AlertTriangle, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

interface QuickStatsProps {
  suppliesCount: number;
  equipmentCount: number;
  lowStockCount: number;
  maintenanceDueCount: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  suppliesCount,
  equipmentCount,
  lowStockCount,
  maintenanceDueCount,
}) => {
  const inventoryHealth = lowStockCount === 0 ? 100 : Math.max(0, 100 - (lowStockCount / suppliesCount) * 100);
  const equipmentHealth = maintenanceDueCount === 0 ? 100 : Math.max(0, 100 - (maintenanceDueCount / equipmentCount) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Supplies */}
      <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">Total Supplies</CardTitle>
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900 mb-2">{suppliesCount}</div>
          <div className="flex items-center gap-2">
            <Progress value={inventoryHealth} className="flex-1 h-2" />
            <Badge variant={inventoryHealth > 80 ? "default" : inventoryHealth > 60 ? "secondary" : "destructive"} className="text-xs">
              {inventoryHealth.toFixed(0)}% healthy
            </Badge>
          </div>
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Inventory tracking active
          </p>
        </CardContent>
      </Card>

      {/* Total Equipment */}
      <Card className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">Total Equipment</CardTitle>
          <div className="p-3 bg-green-600 rounded-xl shadow-lg">
            <Wrench className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900 mb-2">{equipmentCount}</div>
          <div className="flex items-center gap-2">
            <Progress value={equipmentHealth} className="flex-1 h-2" />
            <Badge variant={equipmentHealth > 80 ? "default" : equipmentHealth > 60 ? "secondary" : "destructive"} className="text-xs">
              {equipmentHealth.toFixed(0)}% operational
            </Badge>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Equipment monitoring
          </p>
        </CardContent>
      </Card>

      {/* Low Stock Alerts */}
      <Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">Low Stock Alerts</CardTitle>
          <div className="p-3 bg-orange-600 rounded-xl shadow-lg">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-900 mb-2">{lowStockCount}</div>
          <div className="flex items-center gap-2">
            {lowStockCount > 0 ? (
              <Badge variant="destructive" className="text-xs">
                Requires attention
              </Badge>
            ) : (
              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                All good
              </Badge>
            )}
          </div>
          <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
            {lowStockCount > 0 ? (
              <>
                <TrendingDown className="h-3 w-3" />
                Restock needed
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Stock levels optimal
              </>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Maintenance Due */}
      <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Maintenance Due</CardTitle>
          <div className="p-3 bg-purple-600 rounded-xl shadow-lg">
            <Wrench className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900 mb-2">{maintenanceDueCount}</div>
          <div className="flex items-center gap-2">
            {maintenanceDueCount > 0 ? (
              <Badge variant="secondary" className="text-xs">
                Schedule maintenance
              </Badge>
            ) : (
              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                Up to date
              </Badge>
            )}
          </div>
          <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
            {maintenanceDueCount > 0 ? (
              <>
                <AlertTriangle className="h-3 w-3" />
                Maintenance required
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                All maintained
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
