
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface CategoryCallsChartProps {
  data?: Array<{
    category: string;
    technical: number;
    billing: number;
    general: number;
    complaints: number;
  }>;
  title?: string;
  subtitle?: string;
}

const CategoryCallsChart: React.FC<CategoryCallsChartProps> = ({ 
  data,
  title = "Calls by Category",
  subtitle = "Distribution of calls by category type" 
}) => {
  // Default data if none is provided
  const defaultData = [
    { 
      category: 'Monday', 
      technical: 45, 
      billing: 30, 
      general: 25, 
      complaints: 10 
    },
    { 
      category: 'Tuesday', 
      technical: 50, 
      billing: 25, 
      general: 30, 
      complaints: 15 
    },
    { 
      category: 'Wednesday', 
      technical: 40, 
      billing: 35, 
      general: 20, 
      complaints: 12 
    },
    { 
      category: 'Thursday', 
      technical: 55, 
      billing: 28, 
      general: 18, 
      complaints: 14 
    },
    { 
      category: 'Friday', 
      technical: 48, 
      billing: 32, 
      general: 22, 
      complaints: 8 
    }
  ];

  const chartData = data?.length ? data : defaultData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="technical" stackId="a" fill="#8884d8" name="Technical" />
              <Bar dataKey="billing" stackId="a" fill="#82ca9d" name="Billing" />
              <Bar dataKey="general" stackId="a" fill="#ffc658" name="General" />
              <Bar dataKey="complaints" stackId="a" fill="#ff8042" name="Complaints" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCallsChart;
