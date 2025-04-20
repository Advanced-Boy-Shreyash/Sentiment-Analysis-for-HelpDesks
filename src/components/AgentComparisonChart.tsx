
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

interface AgentComparisonChartProps {
  data?: Array<{
    name: string;
    callsHandled: number;
    avgHandlingTime: number;
  }>;
  title?: string;
  subtitle?: string;
}

const AgentComparisonChart: React.FC<AgentComparisonChartProps> = ({ 
  data,
  title = "Agent Call Metrics",
  subtitle = "Call volume and handling time by agent" 
}) => {
  // Default data if none is provided
  const defaultData = [
    { name: 'Shreyash.', callsHandled: 145, avgHandlingTime: 4.2 },
    { name: 'Shivam.', callsHandled: 132, avgHandlingTime: 3.8 },
    { name: 'Yashswi.', callsHandled: 156, avgHandlingTime: 4.5 },
    { name: 'Shravani', callsHandled: 118, avgHandlingTime: 5.2 },
    // { name: 'Carol M.', callsHandled: 128, avgHandlingTime: 4.1 }
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
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                label={{ value: 'Calls Handled', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))', fontSize: 12 } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                label={{ value: 'Avg. Time (min)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))', fontSize: 12 } }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p style={{ color: '#8884d8' }}>{`Calls: ${payload[0].value}`}</p>
                        <p style={{ color: '#82ca9d' }}>{`Avg Time: ${payload[1].value} min`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="callsHandled" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
                name="Calls Handled" 
              />
              <Bar 
                yAxisId="right" 
                dataKey="avgHandlingTime" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
                name="Avg Handling Time (min)" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentComparisonChart;
