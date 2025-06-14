
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Users, BarChart3, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Farm Inventory</span>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="hover:bg-green-50">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-16 pb-20 text-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 rounded-3xl"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Smart Farm Inventory
              <span className="text-green-600 block"> Management</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              🌱 Streamline your agricultural operations with our comprehensive inventory management system. 
              Track supplies, manage equipment, and optimize your farm's productivity.
            </p>
            
            {!user && (
              <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-lg px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="text-lg px-10 py-4 rounded-xl border-2 hover:bg-green-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Powerful features designed for modern farming</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="relative mb-6">
                <div 
                  className="h-48 bg-cover bg-center rounded-xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`
                  }}
                />
                <div className="absolute -bottom-4 left-4 p-3 bg-green-600 rounded-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Different access levels for farmers, admins, and extension officers to ensure proper workflow management and security.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="relative mb-6">
                <div 
                  className="h-48 bg-cover bg-center rounded-xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`
                  }}
                />
                <div className="absolute -bottom-4 left-4 p-3 bg-blue-600 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your inventory levels, equipment usage, and farm productivity with comprehensive reporting and visual dashboards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="relative mb-6">
                <div 
                  className="h-48 bg-cover bg-center rounded-xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`
                  }}
                />
                <div className="absolute -bottom-4 left-4 p-3 bg-purple-600 rounded-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Your farm data is protected with enterprise-grade security, automatic backups, and 99.9% uptime guarantee.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
