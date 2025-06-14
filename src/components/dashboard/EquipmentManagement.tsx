
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddEquipmentDialog } from '@/components/modals/AddEquipmentDialog';
import { useEquipment } from '@/hooks/useEquipment';
import { Plus, Wrench, AlertTriangle, Settings, Calendar, Edit, Trash2 } from 'lucide-react';

export const EquipmentManagement: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { equipment, isLoading } = useEquipment();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'repair':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'retired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <Settings className="h-4 w-4" />;
      case 'maintenance':
        return <Calendar className="h-4 w-4" />;
      case 'repair':
        return <AlertTriangle className="h-4 w-4" />;
      case 'retired':
        return <Wrench className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryImage = (category: string) => {
    const categoryImages = {
      'Tractors': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Harvesters': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Irrigation': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'Tools': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'default': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    };
    return categoryImages[category as keyof typeof categoryImages] || categoryImages.default;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          <div className="relative p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Equipment Management</h2>
              <p className="text-blue-100 mt-1">Manage and maintain your farm equipment</p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading equipment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        <div className="relative p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Equipment Management</h2>
            <p className="text-blue-100 mt-1">Manage and maintain your farm equipment</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>
      </div>

      {equipment.length === 0 ? (
        <Card className="overflow-hidden">
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Wrench className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">No equipment found</h3>
                <p className="text-lg mb-6 opacity-90">
                  Start by adding your first equipment to track maintenance and usage.
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add First Equipment
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <Card key={item.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getCategoryImage(item.category)} 
                  alt={item.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(item.status)} font-medium`}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status}</span>
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  {item.purchase_cost && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Purchase Cost:</span>
                      <span className="font-semibold text-blue-600">${item.purchase_cost}</span>
                    </div>
                  )}
                  
                  {item.purchase_date && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Purchase Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(item.purchase_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {item.last_maintenance_date && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Maintenance:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(item.last_maintenance_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {item.next_maintenance_date && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Maintenance:</span>
                      <span className="font-medium text-orange-600">
                        {new Date(item.next_maintenance_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {item.description && (
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-600 block mb-1">Description:</span>
                      <p className="text-sm text-gray-800 leading-relaxed">{item.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 mt-6 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddEquipmentDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
};
