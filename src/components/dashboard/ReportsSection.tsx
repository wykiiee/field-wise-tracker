
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

export const ReportsSection: React.FC = () => {
  const reports = [
    {
      id: '1',
      title: 'Inventory Summary',
      description: 'Complete overview of all supplies and equipment',
      type: 'summary',
      lastGenerated: '2 days ago',
      icon: <PieChart className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Low Stock Report',
      description: 'Items that need restocking soon',
      type: 'alert',
      lastGenerated: '1 day ago',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Equipment Maintenance',
      description: 'Maintenance schedules and history',
      type: 'maintenance',
      lastGenerated: '3 days ago',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Cost Analysis',
      description: 'Monthly spending and cost breakdown',
      type: 'financial',
      lastGenerated: '1 week ago',
      icon: <FileText className="h-4 w-4" />
    }
  ];

  const getReportBadgeColor = (type: string) => {
    switch (type) {
      case 'summary': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-orange-600" />
          Reports & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getReportBadgeColor(report.type)}`}>
                {report.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{report.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{report.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getReportBadgeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {report.lastGenerated}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button size="sm">
                Generate
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Custom Report</h4>
              <p className="text-sm text-gray-600">Generate a custom report with specific parameters</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <FileText className="h-4 w-4 mr-2" />
              Create Custom Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
