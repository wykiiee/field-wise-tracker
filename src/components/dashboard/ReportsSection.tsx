
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, FileText, TrendingUp, Calendar } from 'lucide-react';

export const ReportsSection: React.FC = () => {
  const reports = [
    {
      id: 1,
      name: 'Monthly Inventory Summary',
      type: 'Inventory',
      date: '2024-06-01',
      status: 'Ready',
      description: 'Complete overview of inventory levels and usage patterns'
    },
    {
      id: 2,
      name: 'Equipment Maintenance Log',
      type: 'Equipment',
      date: '2024-06-05',
      status: 'Ready',
      description: 'Detailed maintenance history and upcoming service schedules'
    },
    {
      id: 3,
      name: 'Cost Analysis Report',
      type: 'Financial',
      date: '2024-06-10',
      status: 'Generating',
      description: 'Comprehensive cost breakdown and budget analysis'
    },
    {
      id: 4,
      name: 'Usage Analytics',
      type: 'Analytics',
      date: '2024-06-12',
      status: 'Ready',
      description: 'Supply usage trends and optimization recommendations'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Ready': return 'default';
      case 'Generating': return 'secondary';
      case 'Error': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Inventory': return <BarChart3 className="h-4 w-4" />;
      case 'Equipment': return <FileText className="h-4 w-4" />;
      case 'Financial': return <TrendingUp className="h-4 w-4" />;
      case 'Analytics': return <BarChart3 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$1,450</div>
            <p className="text-xs text-muted-foreground">From optimization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Gain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+18%</div>
            <p className="text-xs text-muted-foreground">Compared to last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate New Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Inventory Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Equipment Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Financial Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Custom Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(report.type)}
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={getStatusBadgeVariant(report.status)}>
                      {report.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {report.status === 'Ready' && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
