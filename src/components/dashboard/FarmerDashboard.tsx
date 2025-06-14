
import React from 'react';
import { useSupplies } from '@/hooks/useSupplies';
import { useEquipment } from '@/hooks/useEquipment';
import { InventoryOverview } from './InventoryOverview';
import { SupplyManagement } from './SupplyManagement';
import { EquipmentManagement } from './EquipmentManagement';
import { ReportsSection } from './ReportsSection';
import { QuickStats } from './QuickStats';
import { RecentActivity } from './RecentActivity';
import { InventoryChart } from './InventoryChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Calendar, Bell } from 'lucide-react';

export const FarmerDashboard = () => {
  const { supplies, isLoading: suppliesLoading } = useSupplies();
  const { equipment, isLoading: equipmentLoading } = useEquipment();

  const isLoading = suppliesLoading || equipmentLoading;

  // Calculate stats
  const suppliesCount = supplies?.length || 0;
  const equipmentCount = equipment?.length || 0;
  const lowStockCount = supplies?.filter(supply => supply.status === 'low_stock' || supply.status === 'out_of_stock').length || 0;
  const maintenanceDueCount = equipment?.filter(item => item.status === 'maintenance' || item.status === 'repair').length || 0;

  // Prepare chart data
  const suppliesData = supplies ? 
    Object.entries(
      supplies.reduce((acc, supply) => {
        acc[supply.category] = (acc[supply.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([category, count]) => ({ category, count, value: count })) : [];

  const equipmentData = equipment ?
    Object.entries(
      equipment.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([category, count]) => ({ category, count, value: count })) : [];

  // Generate recent activity (mock data for now)
  const recentActivity = [
    {
      id: '1',
      type: 'supply' as const,
      action: 'added' as const,
      name: 'Fertilizer - NPK 20-20-20',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      type: 'equipment' as const,
      action: 'updated' as const,
      name: 'John Deere Tractor',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'supply' as const,
      action: 'deleted' as const,
      name: 'Pesticide - Roundup',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back to your farm!</h2>
              <p className="text-green-100">Manage your inventory, track equipment, and optimize your farm operations</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-green-100">Farm Health</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₦2.4M</div>
                <div className="text-sm text-green-100">Est. Value</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats with Enhanced Visuals */}
      <QuickStats 
        suppliesCount={suppliesCount}
        equipmentCount={equipmentCount}
        lowStockCount={lowStockCount}
        maintenanceDueCount={maintenanceDueCount}
      />

      {/* Quick Actions Bar */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Quick Actions & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-green-600 hover:bg-green-700 shadow-md">
              Add New Supply
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
              Generate Report
            </Button>
            {lowStockCount > 0 && (
              <Badge className="bg-red-100 text-red-800 px-3 py-1 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {lowStockCount} items need restocking
              </Badge>
            )}
            {maintenanceDueCount > 0 && (
              <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {maintenanceDueCount} equipment needs maintenance
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts with Enhanced Styling */}
      <InventoryChart 
        suppliesData={suppliesData}
        equipmentData={equipmentData}
      />

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Inventory Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 mb-2">92%</div>
            <Progress value={92} className="mb-2" />
            <p className="text-xs text-green-600">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Equipment Uptime</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 mb-2">87%</div>
            <Progress value={87} className="mb-2" />
            <p className="text-xs text-blue-600">
              <span className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -2% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Cost Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 mb-2">₦15K</div>
            <p className="text-xs text-purple-600">Saved this month</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+8% efficiency</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid with Enhanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm">
            <InventoryOverview />
          </div>
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-sm">
            <SupplyManagement />
          </div>
          <div className="bg-gradient-to-r from-white to-green-50 rounded-lg shadow-sm">
            <EquipmentManagement />
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-sm">
            <RecentActivity activities={recentActivity} />
          </div>
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-sm">
            <ReportsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
