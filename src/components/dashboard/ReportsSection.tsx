
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyUsageData = [
  { month: 'Jan', supplies: 2400, equipment: 400 },
  { month: 'Feb', supplies: 1398, equipment: 300 },
  { month: 'Mar', supplies: 3800, equipment: 500 },
  { month: 'Apr', supplies: 3908, equipment: 450 },
  { month: 'May', supplies: 4800, equipment: 600 },
  { month: 'Jun', supplies: 3800, equipment: 550 }
];

const categoryData = [
  { name: 'Fertilizers', value: 40, color: '#0088FE' },
  { name: 'Seeds', value: 30, color: '#00C49F' },
  { name: 'Pesticides', value: 20, color: '#FFBB28' },
  { name: 'Tools', value: 10, color: '#FF8042' }
];

export const ReportsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">Track usage patterns and inventory insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage Trends</CardTitle>
            <CardDescription>Supply and equipment usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="supplies" fill="#8884d8" name="Supplies ($)" />
                  <Bar dataKey="equipment" fill="#82ca9d" name="Equipment ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Distribution of inventory value by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$18,450</div>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">$3,800</div>
            <p className="text-sm text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">87%</div>
            <p className="text-sm text-muted-foreground">+3% improvement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
