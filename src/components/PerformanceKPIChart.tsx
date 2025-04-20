
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface KPIData {
  subject: string;
  value: number;
  fullMark: number;
}

interface PerformanceKPIChartProps {
  data: KPIData[];
  title?: string;
  subtitle?: string;
}

const PerformanceKPIChart: React.FC<PerformanceKPIChartProps> = ({ 
  data, 
  title = "Performance KPIs", 
  subtitle = "Key performance indicators overview" 
}) => {
  const defaultData: KPIData[] = [
    { subject: 'Efficiency', value: 85, fullMark: 100 },
    { subject: 'Resolution', value: 90, fullMark: 100 },
    { subject: 'Satisfaction', value: 75, fullMark: 100 },
    { subject: 'Speed', value: 80, fullMark: 100 },
    { subject: 'Accuracy', value: 88, fullMark: 100 },
    { subject: 'Empathy', value: 92, fullMark: 100 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={chartData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{data.subject}</p>
                        <p className="text-primary">{`Value: ${data.value}/100`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceKPIChart;
