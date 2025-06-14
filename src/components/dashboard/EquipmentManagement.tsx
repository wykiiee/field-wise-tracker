
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEquipment } from '@/hooks/useEquipment';
import { Wrench, Plus, Search, Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const EquipmentManagement: React.FC = () => {
  const { equipment, isLoading, deleteEquipment } = useEquipment();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteEquipment(id);
        toast({
          title: "Equipment Deleted",
          description: `${name} has been removed from your inventory.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete equipment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>;
      case 'maintenance':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'repair':
        return <Badge variant="destructive">Needs Repair</Badge>;
      case 'retired':
        return <Badge variant="destructive">Retired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Equipment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-green-600" />
          Equipment Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Add */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>

          {/* Equipment List */}
          <div className="space-y-3">
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {getStatusBadge(item.status)}
                      {item.status !== 'operational' && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.category}
                      {item.purchase_cost && ` • ₦${item.purchase_cost}`}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      {item.purchase_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Purchased: {format(new Date(item.purchase_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                      {item.next_maintenance_date && (
                        <span className="flex items-center gap-1">
                          <Wrench className="h-3 w-3" />
                          Next maintenance: {format(new Date(item.next_maintenance_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? 'No equipment found matching your search.' : 'No equipment in your inventory yet.'}
                </p>
                <Button className="mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Equipment
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
