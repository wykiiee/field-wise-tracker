
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryOverview } from './InventoryOverview';
import { SupplyManagement } from './SupplyManagement';
import { EquipmentManagement } from './EquipmentManagement';
import { Sprout, Package, Wrench } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Crops</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active crop varieties</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Field Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Fields in production</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Active machinery</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="supplies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="supplies">My Supplies</TabsTrigger>
          <TabsTrigger value="equipment">My Equipment</TabsTrigger>
          <TabsTrigger value="overview">Farm Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="supplies" className="space-y-6">
          <SupplyManagement />
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <EquipmentManagement />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};
