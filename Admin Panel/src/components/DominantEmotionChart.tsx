
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmotionData {
  name: string;
  value: number;
}

interface DominantEmotionChartProps {
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

const DominantEmotionChart: React.FC<DominantEmotionChartProps> = ({ data, dominantEmotion }) => {
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
          Dominant emotion: <span className="font-medium">{formattedDominantEmotion}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={EMOTION_COLORS[entry.name as keyof typeof EMOTION_COLORS] || '#9ca3af'} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DominantEmotionChart;
