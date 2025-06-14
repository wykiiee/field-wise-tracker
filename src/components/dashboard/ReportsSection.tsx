
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupplies } from '@/hooks/useSupplies';
import { useEquipment } from '@/hooks/useEquipment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Package, Wrench } from 'lucide-react';

export const ReportsSection: React.FC = () => {
  const { supplies, isLoading: suppliesLoading } = useSupplies();
  const { equipment, isLoading: equipmentLoading } = useEquipment();

  if (suppliesLoading || equipmentLoading) {
    return (
      <div className="space-y-6">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="relative p-6">
            <h2 className="text-2xl font-bold mb-2">Reports & Analytics</h2>
            <p className="text-purple-100">Track your farm's inventory and equipment performance</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading reports...</p>
        </div>
      </div>
    );
  }

  // Supply category data for charts
  const supplyCategoryData = supplies.reduce((acc, supply) => {
    acc[supply.category] = (acc[supply.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const supplyCategoryChart = Object.entries(supplyCategoryData).map(([category, count]) => ({
    category,
    count,
  }));

  // Equipment category data
  const equipmentCategoryData = equipment.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const equipmentCategoryChart = Object.entries(equipmentCategoryData).map(([category, count]) => ({
    category,
    count,
  }));

  // Status distribution for supplies
  const supplyStatusData = supplies.reduce((acc, supply) => {
    acc[supply.status] = (acc[supply.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const supplyStatusChart = Object.entries(supplyStatusData).map(([status, count]) => ({
    status: status.replace('_', ' '),
    count,
  }));

  // Equipment status data
  const equipmentStatusData = equipment.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const equipmentStatusChart = Object.entries(equipmentStatusData).map(([status, count]) => ({
    status,
    count,
  }));

  // Calculate total values
  const totalSupplyValue = supplies.reduce((sum, supply) => {
    return sum + (supply.cost_per_unit ? supply.quantity * supply.cost_per_unit : 0);
  }, 0);

  const totalEquipmentValue = equipment.reduce((sum, item) => {
    return sum + (item.purchase_cost || 0);
  }, 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        <div className="relative p-6">
          <h2 className="text-2xl font-bold mb-2">Reports & Analytics</h2>
          <p className="text-purple-100">Track your farm's inventory and equipment performance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Supplies</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{supplies.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Supply Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">${totalSupplyValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Equipment</CardTitle>
            <Wrench className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{equipment.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Equipment Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">${totalEquipmentValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {supplyCategoryChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplyCategoryChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No supply data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Equipment Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {equipmentCategoryChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={equipmentCategoryChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No equipment data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supply Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {supplyStatusChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={supplyStatusChart}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {supplyStatusChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No supply status data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Equipment Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {equipmentStatusChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={equipmentStatusChart}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {equipmentStatusChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No equipment status data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
