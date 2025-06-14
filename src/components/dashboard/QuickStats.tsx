
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Wrench, TrendingUp, AlertTriangle } from 'lucide-react';

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
  maintenanceDueCount
}) => {
  const stats = [
    {
      title: "Total Supplies",
      value: suppliesCount,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Equipment Items",
      value: equipmentCount,
      icon: Wrench,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Low Stock Items",
      value: lowStockCount,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Maintenance Due",
      value: maintenanceDueCount,
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
