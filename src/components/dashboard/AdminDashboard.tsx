import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Users, Package, Wrench, BarChart3, AlertTriangle, UserPlus, Edit, Trash2, Settings, Shield, Save, UserCheck } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  // Mock data for analytics
  const userGrowthData = [
    { month: 'Jan', users: 45, active: 38 },
    { month: 'Feb', users: 52, active: 45 },
    { month: 'Mar', users: 61, active: 55 },
    { month: 'Apr', users: 68, active: 62 },
    { month: 'May', users: 89, active: 78 },
    { month: 'Jun', users: 127, active: 115 }
  ];

  const inventoryDistribution = [
    { name: 'Seeds', value: 35, color: '#8884d8' },
    { name: 'Fertilizers', value: 28, color: '#82ca9d' },
    { name: 'Pesticides', value: 20, color: '#ffc658' },
    { name: 'Tools', value: 17, color: '#ff7300' }
  ];

  const systemMetrics = [
    { metric: 'Server Uptime', value: '99.9%', trend: 'stable' },
    { metric: 'Database Size', value: '2.4 GB', trend: 'increasing' },
    { metric: 'Active Sessions', value: '87', trend: 'increasing' },
    { metric: 'Error Rate', value: '0.02%', trend: 'decreasing' }
  ];

  // Enhanced users data with more realistic information
  const [users, setUsers] = useState([
    { id: '1', name: 'John Farmer', email: 'john@farm.com', role: 'farmer', status: 'active', lastLogin: '2 hours ago', joinDate: '2024-01-15' },
    { id: '2', name: 'Sarah Extension', email: 'sarah@extension.com', role: 'extension_officer', status: 'active', lastLogin: '1 day ago', joinDate: '2024-02-20' },
    { id: '3', name: 'Mike Admin', email: 'mike@admin.com', role: 'admin', status: 'active', lastLogin: '30 minutes ago', joinDate: '2024-01-01' },
    { id: '4', name: 'Jane Farmer', email: 'jane@farm.com', role: 'farmer', status: 'inactive', lastLogin: '1 week ago', joinDate: '2024-03-10' },
    { id: '5', name: 'David Extension', email: 'david@extension.com', role: 'extension_officer', status: 'active', lastLogin: '3 hours ago', joinDate: '2024-02-28' },
    { id: '6', name: 'Lisa Farmer', email: 'lisa@farm.com', role: 'farmer', status: 'active', lastLogin: '5 minutes ago', joinDate: '2024-03-15' }
  ]);

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, role: newRole }
            : user
        )
      );
      
      setEditingUser(null);
      
      toast({
        title: "Role Updated Successfully",
        description: `User role has been changed to ${newRole.replace('_', ' ')}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle user status toggle
  const handleStatusToggle = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
            : user
        )
      );
      
      toast({
        title: "Status Updated",
        description: "User status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive"
      });
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast({
        title: "User Deleted",
        description: "User has been permanently deleted from the system",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'extension_officer': return 'secondary';
      case 'farmer': return 'default';
      default: return 'outline';
    }
  };

  const chartConfig = {
    users: {
      label: "Total Users",
      color: "hsl(var(--chart-1))",
    },
    active: {
      label: "Active Users",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Across all farms</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">User Management</h3>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add New User
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Users Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingUser === user.id ? (
                            <div className="flex items-center gap-2">
                              <Select 
                                defaultValue={user.role} 
                                onValueChange={(value) => handleRoleChange(user.id, value)}
                              >
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="farmer">Farmer</SelectItem>
                                  <SelectItem value="extension_officer">Extension Officer</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingUser(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                            <Switch
                              checked={user.status === 'active'}
                              onCheckedChange={() => handleStatusToggle(user.id)}
                              className="ml-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {editingUser === user.id ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingUser(null)}
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingUser(user.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">Status: {metric.trend}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">High Memory Usage</p>
                      <p className="text-sm text-yellow-700">Database server at 85% capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">Failed Login Attempts</p>
                      <p className="text-sm text-red-700">Multiple failed attempts detected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                        <Line type="monotone" dataKey="active" stroke="var(--color-active)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inventoryDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {inventoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="users" fill="var(--color-users)" />
                      <Bar dataKey="active" fill="var(--color-active)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="Farm Inventory Management" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" type="email" defaultValue="admin@farminventory.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cst">Central Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <Switch id="maintenance" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="registrations">Allow New Registrations</Label>
                    <Switch id="registrations" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Require 2FA for Admins</Label>
                    <Switch id="twoFactor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordPolicy">Enforce Strong Passwords</Label>
                    <Switch id="passwordPolicy" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auditLogs">Enable Audit Logging</Label>
                    <Switch id="auditLogs" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Role Management & Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-blue-700">Farmer Permissions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="farmerRead">Read Own Data</Label>
                          <Switch id="farmerRead" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="farmerWrite">Modify Own Data</Label>
                          <Switch id="farmerWrite" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="farmerReports">Generate Reports</Label>
                          <Switch id="farmerReports" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="farmerSupport">Request Support</Label>
                          <Switch id="farmerSupport" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-green-700">Extension Officer Permissions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="extensionRead">Read Farmer Data</Label>
                          <Switch id="extensionRead" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="extensionAdvise">Provide Guidance</Label>
                          <Switch id="extensionAdvise" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="extensionReports">System Reports</Label>
                          <Switch id="extensionReports" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="extensionTraining">Manage Training</Label>
                          <Switch id="extensionTraining" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-red-700">Admin Permissions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="adminUsers">Manage Users</Label>
                          <Switch id="adminUsers" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="adminSystem">System Settings</Label>
                          <Switch id="adminSystem" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="adminBackup">Data Backup</Label>
                          <Switch id="adminBackup" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="adminRoles">Manage Roles</Label>
                          <Switch id="adminRoles" defaultChecked disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Role Assignment Rules</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p><strong>Farmer → Extension Officer:</strong> Requires admin approval</p>
                        <p><strong>Farmer → Admin:</strong> Requires super admin approval</p>
                      </div>
                      <div className="space-y-2">
                        <p><strong>Extension Officer → Admin:</strong> Requires super admin approval</p>
                        <p><strong>Admin → Other Roles:</strong> Requires super admin approval</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={() => toast({ title: "Settings Saved", description: "All settings have been saved successfully" })}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
