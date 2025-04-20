
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
  Cell
} from 'recharts';

interface SatisfactionScoreChartProps {
  data?: Array<{
    name: string;
    score: number;
  }>;
  title?: string;
  subtitle?: string;
}

const SatisfactionScoreChart: React.FC<SatisfactionScoreChartProps> = ({ 
  data,
  title = "Customer Satisfaction Score",
  subtitle = "CSAT scores based on post-call surveys" 
}) => {
  // Default data if none is provided
  const defaultData = [
    { name: 'Week 1', score: 4.2 },
    { name: 'Week 2', score: 4.5 },
    { name: 'Week 3', score: 4.0 },
    { name: 'Week 4', score: 4.7 },
    { name: 'Week 5', score: 4.3 }
  ];

  const chartData = data?.length ? data : defaultData;

  const getBarColor = (score: number) => {
    if (score >= 4.5) return '#4ade80'; // Green for excellent
    if (score >= 4.0) return '#60a5fa'; // Blue for good
    if (score >= 3.5) return '#f59e0b'; // Yellow for average
    return '#f87171'; // Red for poor
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                domain={[0, 5]}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const score = payload[0].value as number;
                    let rating = "Poor";
                    if (score >= 4.5) rating = "Excellent";
                    else if (score >= 4.0) rating = "Good";
                    else if (score >= 3.5) rating = "Average";
                    
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary">{`Score: ${score}/5`}</p>
                        <p>{`Rating: ${rating}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SatisfactionScoreChart;
