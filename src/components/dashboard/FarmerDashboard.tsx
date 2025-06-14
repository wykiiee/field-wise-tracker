
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
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Calendar, Bell, Plus, BarChart3, Users, Target } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse shadow-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse shadow-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Welcome Banner */}
        <Card className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-2xl border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Farmer! 🌾</h1>
                    <p className="text-green-100 text-lg">Transform your farm with smart inventory management</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Farm Status: Active</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Target className="h-4 w-4" />
                    <span>Season: Planting</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-sm text-green-100">Farm Health</div>
                  <Progress value={98} className="mt-2 h-2" />
                </div>
                <div className="text-center bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-1">₦2.4M</div>
                  <div className="text-sm text-green-100">Est. Value</div>
                  <div className="flex items-center gap-1 mt-2 justify-center">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Stats */}
        <QuickStats 
          suppliesCount={suppliesCount}
          equipmentCount={equipmentCount}
          lowStockCount={lowStockCount}
          maintenanceDueCount={maintenanceDueCount}
        />

        {/* Enhanced Quick Actions Bar */}
        <Card className="bg-gradient-to-r from-white via-blue-50 to-green-50 border-blue-200 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Quick Actions & Smart Alerts
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transform hover:scale-105 transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Supply
                  </Button>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-md transform hover:scale-105 transition-all duration-200">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-md transform hover:scale-105 transition-all duration-200">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Smart Alerts</h4>
                <div className="space-y-2">
                  {lowStockCount > 0 && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 flex items-center gap-2 w-fit shadow-lg">
                      <AlertTriangle className="h-4 w-4" />
                      {lowStockCount} items need restocking urgently
                    </Badge>
                  )}
                  {maintenanceDueCount > 0 && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 flex items-center gap-2 w-fit shadow-lg">
                      <Calendar className="h-4 w-4" />
                      {maintenanceDueCount} equipment needs maintenance
                    </Badge>
                  )}
                  {lowStockCount === 0 && maintenanceDueCount === 0 && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 flex items-center gap-2 w-fit shadow-lg">
                      <CheckCircle2 className="h-4 w-4" />
                      All systems running smoothly
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Charts */}
        <div className="bg-white rounded-2xl shadow-xl p-1">
          <InventoryChart 
            suppliesData={suppliesData}
            equipmentData={equipmentData}
          />
        </div>

        {/* Enhanced Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-green-100">Inventory Health</CardTitle>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-3">92%</div>
              <Progress value={92} className="mb-3 h-3" />
              <div className="flex items-center gap-2 text-green-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-blue-100">Equipment Uptime</CardTitle>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-3">87%</div>
              <Progress value={87} className="mb-3 h-3" />
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">-2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-purple-100">Cost Efficiency</CardTitle>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-3">₦15K</div>
              <p className="text-sm text-purple-100 mb-2">Saved this month</p>
              <div className="flex items-center gap-2 text-purple-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+8% efficiency gain</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-r from-white via-gray-50 to-blue-50 shadow-xl border-0 rounded-2xl overflow-hidden">
              <InventoryOverview />
            </Card>
            <Card className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 shadow-xl border-0 rounded-2xl overflow-hidden">
              <SupplyManagement />
            </Card>
            <Card className="bg-gradient-to-r from-white via-green-50 to-emerald-50 shadow-xl border-0 rounded-2xl overflow-hidden">
              <EquipmentManagement />
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border-0 rounded-2xl overflow-hidden">
              <RecentActivity activities={recentActivity} />
            </Card>
            <Card className="bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-xl border-0 rounded-2xl overflow-hidden">
              <ReportsSection />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
