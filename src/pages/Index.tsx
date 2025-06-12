
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Package, BarChart3, Shield, Smartphone, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track supplies, equipment, and usage with smart alerts for low stock items"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get insights into usage patterns, costs, and efficiency trends"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your inventory from anywhere with responsive design"
    },
    {
      icon: Wifi,
      title: "Offline Capable",
      description: "Continue working even without internet connectivity"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your farm data is protected with enterprise-grade security"
    },
    {
      icon: Leaf,
      title: "Sustainability Focus",
      description: "Reduce waste and optimize resource usage for better yields"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Farm Inventory
            <span className="text-green-600"> Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your agricultural operations with our comprehensive inventory management system. 
            Track supplies, manage equipment, and optimize your farm's efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Built for Modern Farming</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-muted-foreground">Farms Using Our System</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">25%</div>
              <p className="text-muted-foreground">Average Cost Reduction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-muted-foreground">Uptime Reliability</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of farmers who are already using our system to improve their operations and increase profitability.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/dashboard">
              Start Managing Your Inventory
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
