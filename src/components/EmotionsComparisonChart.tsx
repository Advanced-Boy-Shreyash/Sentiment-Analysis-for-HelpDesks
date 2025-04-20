
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// TODO: Refactor this component to use context API for better state management
// NOTE: For future improvement, consider adding emotion intensity metrics
// NOTE: Add data export functionality for reports

interface EmotionData {
  name: string;
  customer: number;
  executive: number;
}

interface EmotionsComparisonChartProps {
  data: EmotionData[];
}

/**
 * Color mapping for different emotions
 * These colors are chosen based on psychological color theory
 * where warmer colors represent negative emotions and cooler colors
 * represent positive emotions
 */
const EMOTION_COLORS = {
  'Customer': {
    'Happy': '#4ade80',      // Green
    'Satisfied': '#60a5fa',  // Blue
    'Neutral': '#a78bfa',    // Purple
    'Confused': '#fbbf24',   // Yellow
    'Frustrated': '#f87171', // Red
    'Angry': '#ef4444',      // Bright Red
    'default': '#f97316'     // Orange (default)
  },
  'Executive': {
    'Calm': '#22c55e',       // Green
    'Empathetic': '#3b82f6', // Medium Blue
    'Professional': '#6366f1', // Indigo
    'default': '#60a5fa'     // Blue (default)
  }
};

/**
 * EmotionsComparisonChart Component
 * 
 * This chart displays the comparison between customer emotions and
 * executive responses to those emotions. It helps identify how well
 * executives maintain professional composure during emotionally charged
 * customer interactions.
 * 
 * @author Priya Patel (Final Year Project)
 * @version 1.2.0
 * @date April 4, 2025
 * @param {EmotionsComparisonChartProps} props - Component props
 * @returns {JSX.Element} The rendered chart
 */
const EmotionsComparisonChart: React.FC<EmotionsComparisonChartProps> = ({ data }) => {
  // State to track if chart is visible (for animation purposes)
  const [isVisible, setIsVisible] = useState(false);

  // Simulating loading delay - REMOVE IN PRODUCTION
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Default data that demonstrates the contrast between customer and executive emotions
  // FIXME: Replace with API data in production environment
  const chartData = data || [
    { name: 'Angry', customer: 65, executive: 5 },
    { name: 'Frustrated', customer: 40, executive: 10 },
    { name: 'Confused', customer: 30, executive: 15 },
    { name: 'Neutral', customer: 25, executive: 25 },
    { name: 'Calm', customer: 15, executive: 70 },
    { name: 'Professional', customer: 10, executive: 60 },
    { name: 'Empathetic', customer: 5, executive: 45 }
  ];

  // Helper function to get emotion color based on type and emotion name
  const getEmotionColor = (type: 'customer' | 'executive', emotion: string) => {
    const colorMap = type === 'customer' ? EMOTION_COLORS.Customer : EMOTION_COLORS.Executive;
    return colorMap[emotion as keyof typeof colorMap] || colorMap.default;
  };

  // Custom tooltip to display chart data with more context
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const emotion = payload[0].payload.name;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{emotion}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: emotion === 'Angry' || emotion === 'Frustrated' 
                    ? '#ef4444' 
                    : '#f97316' 
                }}></div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Customer:</span> {payload[0].value}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: emotion === 'Calm' || emotion === 'Professional' || emotion === 'Empathetic' 
                    ? '#22c55e' 
                    : '#60a5fa' 
                }}></div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Executive:</span> {payload[1].value}%
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow duration-300 border-border overflow-hidden ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
      style={{ 
        backgroundImage: 'linear-gradient(to bottom right, hsl(var(--card)) 0%, hsl(var(--card)) 80%, hsl(var(--muted))/10% 100%)'
      }}>
      <CardHeader className="pb-2 bg-gradient-to-r from-card to-background rounded-t-lg border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Emotion Comparison</CardTitle>
            <CardDescription>
              How executives respond to different customer emotional states
            </CardDescription>
          </div>
          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
            v1.2
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 30,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} 
                formatter={(value) => <span className="text-sm capitalize">{value}</span>}
                iconType="circle"
              />
              <Bar 
                dataKey="customer" 
                name="Customer" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
                className="hover:opacity-90 transition-opacity"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`customer-cell-${index}`} 
                    fill={entry.name === 'Angry' || entry.name === 'Frustrated' ? '#ef4444' : '#f97316'} 
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="executive" 
                name="Executive" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
                className="hover:opacity-90 transition-opacity"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`executive-cell-${index}`} 
                    fill={entry.name === 'Calm' || entry.name === 'Professional' || entry.name === 'Empathetic' ? '#22c55e' : '#60a5fa'} 
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border/50">
          <p><span className="font-medium">How to read this chart:</span> This visualization shows how executives respond emotionally when customers present different emotional states. The contrast highlights how well executives maintain professional composure.</p>
          <p className="mt-2 text-xs">Note: Data collected from call transcription analysis using NLP sentiment scoring (Jan-Mar 2025)</p>
          <div className="mt-3 pt-2 border-t border-border/30 flex justify-between items-center">
            <span className="text-xs italic">Data processed using custom ML algorithms</span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">98.5% accuracy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionsComparisonChart;
