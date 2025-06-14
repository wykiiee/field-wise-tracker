
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Wrench, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'supply' | 'equipment';
  action: 'added' | 'updated' | 'deleted';
  name: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string, action: string) => {
    if (action === 'added') return <Plus className="h-4 w-4" />;
    if (action === 'updated') return <Edit className="h-4 w-4" />;
    if (action === 'deleted') return <Trash2 className="h-4 w-4" />;
    return type === 'supply' ? <Package className="h-4 w-4" /> : <Wrench className="h-4 w-4" />;
  };

  const getActivityColor = (action: string) => {
    switch (action) {
      case 'added': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'deleted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'supply' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border">
                <div className={`p-2 rounded-full ${getActivityColor(activity.action)}`}>
                  {getActivityIcon(activity.type, activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={getTypeColor(activity.type)}>
                      {activity.type}
                    </Badge>
                    <Badge variant="outline" className={getActivityColor(activity.action)}>
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(activity.timestamp, 'MMM dd, yyyy • HH:mm')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400">Activity will appear here as you manage your inventory</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
