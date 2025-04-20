import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EmotionData {
  name: string;
  value: number;
}

interface CustomerEmotionsBarChartProps {
  data: EmotionData[];
  dominantEmotion?: string;
}

const EMOTION_COLORS = {
  'Happy': '#4ade80',      // Green
  'Satisfied': '#60a5fa',  // Blue
  'Neutral': '#a78bfa',    // Purple
  'Confused': '#fbbf24',   // Yellow
  'Frustrated': '#f87171', // Red
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CustomerEmotionsBarChart: React.FC<CustomerEmotionsBarChartProps> = ({ data, dominantEmotion }) => {
  const chartData = data || [
    { name: 'Happy', value: 30 },
    { name: 'Satisfied', value: 25 },
    { name: 'Neutral', value: 20 },
    { name: 'Confused', value: 15 },
    { name: 'Frustrated', value: 10 },
  ];

  const formattedDominantEmotion = dominantEmotion 
    ? capitalizeFirstLetter(dominantEmotion) 
    : 'N/A';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Customer Emotions</CardTitle>
        <CardDescription>
          Number of calls per emotion type. Dominant: <span className="font-medium">{formattedDominantEmotion}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 30,
              }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">{`Number of calls: ${data.value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                background={{ fill: '#f9fafb' }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={EMOTION_COLORS[entry.name as keyof typeof EMOTION_COLORS] || '#9ca3af'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerEmotionsBarChart;
