
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface HourlyCallVolumeChartProps {
  data?: Array<{
    hour: string;
    calls: number;
  }>;
  title?: string;
  subtitle?: string;
}

const HourlyCallVolumeChart: React.FC<HourlyCallVolumeChartProps> = ({ 
  data,
  title = "Hourly Call Volume",
  subtitle = "Number of calls per hour" 
}) => {
  // Default data if none is provided
  const defaultData = [
    { hour: '9:00', calls: 12 },
    { hour: '10:00', calls: 24 },
    { hour: '11:00', calls: 35 },
    { hour: '12:00', calls: 22 },
    { hour: '13:00', calls: 15 },
    { hour: '14:00', calls: 28 },
    { hour: '15:00', calls: 32 },
    { hour: '16:00', calls: 27 },
    { hour: '17:00', calls: 18 }
  ];

  const chartData = data?.length ? data : defaultData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
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
                        <p className="text-primary">{`Calls: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyCallVolumeChart;
