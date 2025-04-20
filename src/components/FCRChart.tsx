
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FCRChartProps {
  title: string;
  subtitle: string;
  data: {
    category: string;
    rate: number;
  }[];
}

const FCRChart: React.FC<FCRChartProps> = ({ 
  title, 
  subtitle, 
  data = [
    { category: 'Technical', rate: 88 },
    { category: 'Billing', rate: 82 },
    { category: 'General', rate: 95 },
    { category: 'Product', rate: 78 },
    { category: 'Support', rate: 91 }
  ]
}) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57'];
  
  // Function to determine color based on rate
  const getBarColor = (rate: number) => {
    if (rate >= 90) return '#22c55e'; // Green for high performance
    if (rate >= 80) return '#eab308'; // Yellow for medium performance
    if (rate >= 70) return '#f97316'; // Orange for acceptable
    return '#ef4444'; // Red for low performance
  };
  
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2 bg-gradient-to-r from-card to-background rounded-t-lg">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              barSize={30}
              // Removed animationDuration and animationBegin properties
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                scale="point" 
                padding={{ left: 15, right: 15 }} 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Resolution Rate']}
                cursor={{ fill: 'hsla(var(--muted), 0.3)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="rate" 
                name="Resolution Rate"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.rate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FCRChart;
