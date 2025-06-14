
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

export const FarmerDashboard = () => {
  const { supplies, isLoading: suppliesLoading } = useSupplies();
  const { equipment, isLoading: equipmentLoading } = useEquipment();

  const isLoading = suppliesLoading || equipmentLoading;

  // Calculate stats
  const suppliesCount = supplies?.length || 0;
  const equipmentCount = equipment?.length || 0;
  const lowStockCount = supplies?.filter(supply => supply.status === 'low_stock' || supply.status === 'out_of_stock').length || 0;
  const maintenanceDueCount = equipment?.filter(item => item.status === 'maintenance_required').length || 0;

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
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <QuickStats 
        suppliesCount={suppliesCount}
        equipmentCount={equipmentCount}
        lowStockCount={lowStockCount}
        maintenanceDueCount={maintenanceDueCount}
      />

      {/* Charts */}
      <InventoryChart 
        suppliesData={suppliesData}
        equipmentData={equipmentData}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <InventoryOverview />
          <SupplyManagement />
          <EquipmentManagement />
        </div>
        
        <div className="space-y-8">
          <RecentActivity activities={recentActivity} />
          <ReportsSection />
        </div>
      </div>
    </div>
  );
};
