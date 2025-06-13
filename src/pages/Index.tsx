
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Users, BarChart3, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Farm Inventory</span>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Smart Farm Inventory
            <span className="text-green-600"> Management</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your agricultural operations with our comprehensive inventory management system. 
            Track supplies, manage equipment, and optimize your farm's productivity.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            {!user && (
              <>
                <Link to="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="text-lg px-8 py-3">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Based Access</h3>
            <p className="text-gray-600">
              Different access levels for farmers, admins, and extension officers to ensure proper workflow management.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">
              Track your inventory levels, equipment usage, and farm productivity with comprehensive reporting tools.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your farm data is protected with enterprise-grade security and automatic backups.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
