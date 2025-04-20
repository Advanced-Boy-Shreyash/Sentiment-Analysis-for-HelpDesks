
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ExecutiveEmotionCardProps {
  dominantEmotion?: string;
}

const EMOTION_COLORS = {
  'happy': '#4ade80',      // Green
  'satisfied': '#60a5fa',  // Blue
  'neutral': '#a78bfa',    // Purple
  'confused': '#fbbf24',   // Yellow
  'frustrated': '#f87171', // Red
};

const emotionData = {
  'happy': [
    { name: 'Happy', value: 60 },
    { name: 'Other', value: 40 },
  ],
  'satisfied': [
    { name: 'Satisfied', value: 55 },
    { name: 'Other', value: 45 },
  ],
  'neutral': [
    { name: 'Neutral', value: 50 },
    { name: 'Other', value: 50 },
  ],
  'confused': [
    { name: 'Confused', value: 45 },
    { name: 'Other', value: 55 },
  ],
  'frustrated': [
    { name: 'Frustrated', value: 40 },
    { name: 'Other', value: 60 },
  ],
};

const capitalizeFirstLetter = (string?: string) => {
  if (!string) return 'N/A';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ExecutiveEmotionCard: React.FC<ExecutiveEmotionCardProps> = ({ dominantEmotion = 'neutral' }) => {
  const getEmotionColor = (emotion?: string) => {
    if (!emotion) return '#9ca3af';
    return EMOTION_COLORS[emotion as keyof typeof EMOTION_COLORS] || '#9ca3af';
  };
  
  const data = emotionData[dominantEmotion as keyof typeof emotionData] || emotionData.neutral;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex items-center justify-between">
        <div className="p-3">
          <p className="text-sm font-medium">Dominant Emotion</p>
          <p 
            className="text-xl font-bold"
            style={{ color: getEmotionColor(dominantEmotion) }}
          >
            {capitalizeFirstLetter(dominantEmotion)}
          </p>
        </div>
        <div className="h-[60px] w-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={30}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={getEmotionColor(dominantEmotion)} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveEmotionCard;
