
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Wrench, AlertTriangle, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Supplies",
    value: "156",
    description: "Active inventory items",
    icon: Package,
    trend: "+12% from last month"
  },
  {
    title: "Equipment",
    value: "23",
    description: "Farm tools & machinery",
    icon: Wrench,
    trend: "+2 new items"
  },
  {
    title: "Low Stock Alerts",
    value: "8",
    description: "Items need restocking",
    icon: AlertTriangle,
    trend: "3 critical items"
  },
  {
    title: "Monthly Usage",
    value: "$2,450",
    description: "Supply consumption value",
    icon: TrendingUp,
    trend: "-5% vs last month"
  }
];

const lowStockItems = [
  { name: "Fertilizer NPK 15-15-15", quantity: "5 bags", status: "critical" },
  { name: "Hybrid Maize Seeds", quantity: "12 kg", status: "low" },
  { name: "Pesticide Solution", quantity: "3 liters", status: "low" },
  { name: "Irrigation Pipes", quantity: "8 pieces", status: "critical" }
];

export const InventoryOverview = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Low Stock Alerts
          </CardTitle>
          <CardDescription>
            Items that need immediate attention or restocking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Remaining: {item.quantity}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'critical' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.status === 'critical' ? 'Critical' : 'Low Stock'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
