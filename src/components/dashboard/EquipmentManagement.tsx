
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Settings, Calendar, AlertTriangle } from 'lucide-react';

export const EquipmentManagement: React.FC = () => {
  const equipment = [
    { 
      id: 1, 
      name: 'John Deere Tractor', 
      type: 'Tractor', 
      status: 'Operational', 
      lastMaintenance: '2024-05-15',
      nextMaintenance: '2024-07-15',
      hoursUsed: 245,
      condition: 'Good'
    },
    { 
      id: 2, 
      name: 'Irrigation System', 
      type: 'Irrigation', 
      status: 'Operational', 
      lastMaintenance: '2024-06-01',
      nextMaintenance: '2024-08-01',
      hoursUsed: 120,
      condition: 'Excellent'
    },
    { 
      id: 3, 
      name: 'Harvester Combine', 
      type: 'Harvester', 
      status: 'Maintenance Required', 
      lastMaintenance: '2024-04-20',
      nextMaintenance: '2024-06-20',
      hoursUsed: 180,
      condition: 'Fair'
    },
    { 
      id: 4, 
      name: 'Spraying Equipment', 
      type: 'Sprayer', 
      status: 'Operational', 
      lastMaintenance: '2024-05-30',
      nextMaintenance: '2024-07-30',
      hoursUsed: 65,
      condition: 'Good'
    },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Maintenance Required': return 'destructive';
      case 'Out of Service': return 'secondary';
      default: return 'default';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Equipment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Items in inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-xs text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {equipment.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                </div>
                <Badge variant={getStatusBadgeVariant(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Condition</span>
                  <p className={`font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Hours Used</span>
                  <p className="font-medium">{item.hoursUsed}h</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Service</span>
                  <p className="font-medium">{new Date(item.lastMaintenance).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Service</span>
                  <p className="font-medium">{new Date(item.nextMaintenance).toLocaleDateString()}</p>
                </div>
              </div>
              
              {item.status === 'Maintenance Required' && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">Maintenance overdue</span>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
