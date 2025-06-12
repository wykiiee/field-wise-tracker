
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { InventoryOverview } from "@/components/dashboard/InventoryOverview";
import { SupplyManagement } from "@/components/dashboard/SupplyManagement";
import { EquipmentManagement } from "@/components/dashboard/EquipmentManagement";
import { ReportsSection } from "@/components/dashboard/ReportsSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Farm Inventory Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your farm supplies, equipment, and track usage efficiently</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="supplies">Supplies</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <InventoryOverview />
          </TabsContent>

          <TabsContent value="supplies" className="space-y-6">
            <SupplyManagement />
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <EquipmentManagement />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
