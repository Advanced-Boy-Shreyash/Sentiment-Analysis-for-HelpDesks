
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface CallEfficiencyData {
  category: string;
  resolved: number;
  pending: number;
}

interface CallEfficiencyChartProps {
  data: CallEfficiencyData[];
}

const CallEfficiencyChart: React.FC<CallEfficiencyChartProps> = ({ data }) => {
  const defaultData: CallEfficiencyData[] = [
    { category: 'Technical', resolved: 65, pending: 35 },
    { category: 'Billing', resolved: 80, pending: 20 },
    { category: 'Product', resolved: 45, pending: 55 },
    { category: 'General', resolved: 90, pending: 10 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Call Resolution Efficiency</CardTitle>
        <CardDescription>Resolved vs. pending calls by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="category" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <p>{`Resolved: ${payload[0].value}%`}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <p>{`Pending: ${payload[1].value}%`}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="resolved" 
                name="Resolved" 
                fill="#4ade80" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="pending" 
                name="Pending" 
                fill="#f87171" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallEfficiencyChart;
