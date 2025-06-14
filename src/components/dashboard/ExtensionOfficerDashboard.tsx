
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, MapPin, MessageSquare, BarChart3, Calendar, Phone, Mail, Star, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const ExtensionOfficerDashboard: React.FC = () => {
  // Sample data for charts
  const farmVisitsData = [
    { month: 'Jan', visits: 8 },
    { month: 'Feb', visits: 12 },
    { month: 'Mar', visits: 15 },
    { month: 'Apr', visits: 10 },
    { month: 'May', visits: 18 },
    { month: 'Jun', visits: 14 },
  ];

  const supportRequestsData = [
    { name: 'Equipment Issues', value: 35, color: '#EF4444' },
    { name: 'Training Requests', value: 25, color: '#3B82F6' },
    { name: 'Technical Support', value: 20, color: '#10B981' },
    { name: 'Consultation', value: 20, color: '#F59E0B' },
  ];

  const farmerEngagementData = [
    { name: 'Highly Engaged', value: 60, color: '#10B981' },
    { name: 'Moderately Engaged', value: 30, color: '#F59E0B' },
    { name: 'Needs Attention', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* Enhanced Stats Cards with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Assigned Farmers</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">45</div>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +3 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Farm Visits</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg shadow-md">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">14</div>
            <p className="text-xs text-green-600">This month</p>
            <Progress value={70} className="mt-2 h-1" />
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Support Requests</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg shadow-md">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">8</div>
            <p className="text-xs text-orange-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Pending response
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Training Sessions</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg shadow-md">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">6</div>
            <p className="text-xs text-purple-600">Scheduled this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Farm Visits Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={farmVisitsData}>
                <defs>
                  <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="visits" stroke="#3B82F6" fill="url(#visitGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              Support Request Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={supportRequestsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supportRequestsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Content Tabs */}
      <Tabs defaultValue="farmers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="farmers" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">My Farmers</TabsTrigger>
          <TabsTrigger value="visits" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Farm Visits</TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Support</TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value="farmers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Farmers in Your Region</CardTitle>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Add New Farmer
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Green Valley Farm', owner: 'John Smith', acres: 150, status: 'active', lastVisit: '2 weeks ago', rating: 4.5 },
                      { name: 'Sunrise Agriculture', owner: 'Mary Johnson', acres: 200, status: 'visit_due', lastVisit: '1 month ago', rating: 4.2 },
                      { name: 'Golden Harvest', owner: 'Robert Brown', acres: 120, status: 'active', lastVisit: '1 week ago', rating: 4.8 },
                    ].map((farm, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{farm.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{farm.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{farm.owner} • {farm.acres} acres</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={farm.status === 'active' ? 'default' : 'destructive'}>
                              {farm.status === 'active' ? 'Active' : 'Visit Due'}
                            </Badge>
                            <span className="text-xs text-gray-500">Last visit: {farm.lastVisit}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            Schedule Visit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Farmer Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={farmerEngagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {farmerEngagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {farmerEngagementData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="visits">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Scheduled Farm Visits</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Visit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { farm: 'Green Valley Farm', type: 'Equipment inspection and training', date: 'Tomorrow, 10:00 AM', status: 'upcoming', priority: 'high' },
                  { farm: 'Sunrise Agriculture', type: 'Crop consultation', date: 'Friday, 2:00 PM', status: 'upcoming', priority: 'medium' },
                  { farm: 'Golden Harvest', type: 'Soil testing review', date: 'Next Monday, 9:00 AM', status: 'scheduled', priority: 'low' },
                ].map((visit, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{visit.farm}</p>
                          <Badge variant={visit.priority === 'high' ? 'destructive' : visit.priority === 'medium' ? 'default' : 'secondary'}>
                            {visit.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{visit.type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{visit.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Support Requests</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline">8 Pending</Badge>
                <Badge className="bg-green-100 text-green-800">12 Resolved</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { issue: 'Tractor hydraulic system failure', farm: 'Sunrise Agriculture', time: '2 hours ago', status: 'urgent', type: 'Equipment' },
                  { issue: 'Irrigation system optimization', farm: 'Green Valley Farm', time: '5 hours ago', status: 'medium', type: 'Technical' },
                  { issue: 'Crop disease identification', farm: 'Golden Harvest', time: '1 day ago', status: 'low', type: 'Consultation' },
                ].map((request, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{request.issue}</p>
                          <Badge variant={request.status === 'urgent' ? 'destructive' : 'outline'}>
                            {request.status}
                          </Badge>
                          <Badge variant="secondary">{request.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{request.farm}</p>
                        <p className="text-xs text-gray-500 mt-1">Submitted {request.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Upcoming Training Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Modern Irrigation Techniques', date: 'June 20, 2024', attendees: 15, location: 'Community Center' },
                    { title: 'Sustainable Farming Practices', date: 'June 25, 2024', attendees: 22, location: 'Green Valley Farm' },
                    { title: 'Equipment Maintenance Workshop', date: 'July 2, 2024', attendees: 8, location: 'Extension Office' },
                  ].map((session, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                      <h4 className="font-semibold text-gray-900">{session.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {session.attendees} attending
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {session.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Training Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Equipment Safety Manual', type: 'PDF', downloads: 45 },
                    { title: 'Crop Management Guide', type: 'Video', views: 128 },
                    { title: 'Irrigation Best Practices', type: 'Presentation', views: 67 },
                    { title: 'Soil Health Assessment', type: 'Checklist', downloads: 89 },
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-500">{resource.type} • {resource.downloads || resource.views} {resource.downloads ? 'downloads' : 'views'}</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
