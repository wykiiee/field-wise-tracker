
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Package, Calendar, DollarSign } from "lucide-react";
import { AddSupplyDialog } from "@/components/modals/AddSupplyDialog";

const supplies = [
  {
    id: 1,
    name: "Fertilizer NPK 15-15-15",
    category: "Fertilizers",
    quantity: 25,
    unit: "bags",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    cost: 45.00,
    supplier: "AgroSupply Co.",
    status: "good"
  },
  {
    id: 2,
    name: "Hybrid Maize Seeds",
    category: "Seeds",
    quantity: 50,
    unit: "kg",
    purchaseDate: "2024-02-01",
    expiryDate: "2024-12-01",
    cost: 12.50,
    supplier: "SeedTech Ltd",
    status: "low"
  },
  {
    id: 3,
    name: "Pesticide Solution",
    category: "Pesticides",
    quantity: 15,
    unit: "liters",
    purchaseDate: "2024-01-20",
    expiryDate: "2024-08-20",
    cost: 28.75,
    supplier: "CropCare Inc",
    status: "critical"
  }
];

export const SupplyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSupplies = supplies.filter(supply =>
    supply.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supply.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-orange-100 text-orange-800';
      case 'good': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supply Management</h2>
          <p className="text-muted-foreground">Track and manage your farm supplies inventory</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Supply
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search supplies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Supplies Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSupplies.map((supply) => (
          <Card key={supply.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{supply.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(supply.status)}>
                  {supply.status}
                </Badge>
              </div>
              <CardDescription>{supply.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium">{supply.quantity} {supply.unit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cost per unit</p>
                  <p className="font-medium">${supply.cost}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Purchased:</span>
                  <span>{supply.purchaseDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Expires:</span>
                  <span>{supply.expiryDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Supplier: {supply.supplier}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddSupplyDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
};
