
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryOverview } from './InventoryOverview';
import { ReportsSection } from './ReportsSection';
import { Users, MapPin, BookOpen, Calendar } from 'lucide-react';

export const ExtensionOfficerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Under supervision</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Districts covered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Visits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="farmers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="farmers">My Farmers</TabsTrigger>
          <TabsTrigger value="visits">Farm Visits</TabsTrigger>
          <TabsTrigger value="reports">Field Reports</TabsTrigger>
          <TabsTrigger value="overview">Regional Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="farmers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Farmers</CardTitle>
              <CardDescription>Farmers under your supervision and guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Farmer management interface would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Visits Schedule</CardTitle>
              <CardDescription>Plan and track your farm visits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Visit scheduling interface would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsSection />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};
