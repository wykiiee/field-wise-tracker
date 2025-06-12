
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { ExtensionOfficerDashboard } from "@/components/dashboard/ExtensionOfficerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'extension_officer':
        return <ExtensionOfficerDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'farmer':
        return 'My Farm Dashboard';
      case 'admin':
        return 'System Administration';
      case 'extension_officer':
        return 'Extension Officer Portal';
      default:
        return 'Farm Inventory Dashboard';
    }
  };

  const getDashboardSubtitle = () => {
    switch (user?.role) {
      case 'farmer':
        return 'Manage your farm supplies, equipment, and track production efficiently';
      case 'admin':
        return 'Oversee system operations, users, and global inventory management';
      case 'extension_officer':
        return 'Support farmers in your region with guidance and monitoring';
      default:
        return 'Manage your farm supplies, equipment, and track usage efficiently';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{getDashboardTitle()}</h1>
          <p className="text-muted-foreground mt-2">{getDashboardSubtitle()}</p>
        </div>

        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard;
