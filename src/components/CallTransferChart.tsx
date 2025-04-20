
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CallTransferChartProps {
  title: string;
  subtitle: string;
  transferRate?: number;
}

const CallTransferChart: React.FC<CallTransferChartProps> = ({ 
  title, 
  subtitle, 
  transferRate = 15 // Default value if none provided
}) => {
  // Calculate the non-transfer rate
  const nonTransferRate = 100 - transferRate;
  
  const data = [
    { name: 'Transferred', value: transferRate },
    { name: 'Not Transferred', value: nonTransferRate }
  ];
  
  // Enhanced color palette with better contrast
  const COLORS = ['#8884d8', '#82ca9d'];
  
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2 bg-gradient-to-r from-card to-background rounded-t-lg">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
                animationBegin={300}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="hsl(var(--background))" 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle" 
                iconSize={10}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <p className="text-xl font-bold text-primary">{transferRate}%</p>
            <p className="text-sm text-muted-foreground">Calls Transferred</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallTransferChart;
