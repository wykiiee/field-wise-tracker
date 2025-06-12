
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Calendar, AlertCircle, CheckCircle } from "lucide-react";

const equipment = [
  {
    id: 1,
    name: "Tractor - John Deere 5055E",
    type: "Heavy Machinery",
    purchaseDate: "2023-03-15",
    condition: "good",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-07-10",
    status: "operational"
  },
  {
    id: 2,
    name: "Water Pump - Centrifugal",
    type: "Irrigation",
    purchaseDate: "2023-08-20",
    condition: "excellent",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-08-15",
    status: "operational"
  },
  {
    id: 3,
    name: "Disc Harrow",
    type: "Tillage",
    purchaseDate: "2023-05-10",
    condition: "fair",
    lastMaintenance: "2023-12-05",
    nextMaintenance: "2024-06-05",
    status: "maintenance_due"
  }
];

export const EquipmentManagement = () => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maintenance_due': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'out_of_service': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Equipment Management</h2>
          <p className="text-muted-foreground">Track your farm equipment and maintenance schedules</p>
        </div>
        <Button className="flex items-center gap-2">
          <Wrench className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.type}</CardDescription>
                  </div>
                </div>
                {getStatusIcon(item.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Condition</span>
                <Badge className={getConditionColor(item.condition)}>
                  {item.condition}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Purchased:</span>
                  <span>{item.purchaseDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Service:</span>
                  <span>{item.lastMaintenance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next Service:</span>
                  <span className={item.status === 'maintenance_due' ? 'text-orange-600 font-medium' : ''}>
                    {item.nextMaintenance}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Maintenance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
