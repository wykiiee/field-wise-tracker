
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Wrench, TrendingUp, AlertTriangle, TrendingDown, CheckCircle2 } from 'lucide-react';

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
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-500",
      trend: "+12%",
      trendIcon: TrendingUp,
      trendColor: "text-green-600"
    },
    {
      title: "Equipment Items",
      value: equipmentCount,
      icon: Wrench,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      iconBg: "bg-green-500",
      trend: "+5%",
      trendIcon: TrendingUp,
      trendColor: "text-green-600"
    },
    {
      title: "Low Stock Items",
      value: lowStockCount,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-500",
      trend: "-8%",
      trendIcon: TrendingDown,
      trendColor: "text-red-600"
    },
    {
      title: "Maintenance Due",
      value: maintenanceDueCount,
      icon: CheckCircle2,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-500",
      trend: "-15%",
      trendIcon: TrendingDown,
      trendColor: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`${stat.bgColor} ${stat.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className={`text-sm font-medium ${stat.color}`}>
              {stat.title}
            </CardTitle>
            <div className={`p-3 ${stat.iconBg} rounded-xl shadow-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="flex items-center gap-1">
              <stat.trendIcon className={`h-4 w-4 ${stat.trendColor}`} />
              <span className={`text-sm font-medium ${stat.trendColor}`}>
                {stat.trend}
              </span>
              <span className="text-xs text-gray-600 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
