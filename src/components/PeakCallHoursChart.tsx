
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

interface PeakCallHoursChartProps {
  data?: Array<{
    hour: string;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
  }>;
  title?: string;
  subtitle?: string;
}

const PeakCallHoursChart: React.FC<PeakCallHoursChartProps> = ({ 
  data,
  title = "Peak Call Hours",
  subtitle = "Heatmap of call volume by day and hour" 
}) => {
  // Default data if none is provided
  const defaultData = [
    { hour: '9:00', monday: 15, tuesday: 25, wednesday: 30, thursday: 20, friday: 10 },
    { hour: '10:00', monday: 20, tuesday: 30, wednesday: 35, thursday: 25, friday: 15 },
    { hour: '11:00', monday: 30, tuesday: 35, wednesday: 40, thursday: 30, friday: 25 },
    { hour: '12:00', monday: 20, tuesday: 25, wednesday: 30, thursday: 20, friday: 15 },
    { hour: '13:00', monday: 15, tuesday: 20, wednesday: 25, thursday: 15, friday: 10 },
    { hour: '14:00', monday: 25, tuesday: 30, wednesday: 35, thursday: 25, friday: 20 },
    { hour: '15:00', monday: 30, tuesday: 35, wednesday: 40, thursday: 30, friday: 25 },
    { hour: '16:00', monday: 25, tuesday: 30, wednesday: 35, thursday: 25, friday: 20 },
    { hour: '17:00', monday: 15, tuesday: 20, wednesday: 25, thursday: 15, friday: 10 }
  ];

  const chartData = data?.length ? data : defaultData;
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Calculate max value for color scale
  const maxValue = Math.max(
    ...chartData.flatMap(item => 
      days.map(day => item[day as keyof typeof item] as number)
    )
  );

  // Function to get cell color based on value
  const getCellColor = (value: number) => {
    const intensity = value / maxValue;
    return `rgba(139, 92, 246, ${intensity.toFixed(2)})`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            {/* Day labels (columns) */}
            <div className="flex">
              <div className="w-20 flex-shrink-0"></div>
              {dayLabels.map((day, i) => (
                <div key={i} className="flex-1 text-center text-sm font-medium">{day}</div>
              ))}
            </div>

            {/* Heatmap cells */}
            {chartData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center py-1">
                <div className="w-20 flex-shrink-0 text-sm text-right pr-4 text-muted-foreground">
                  {row.hour}
                </div>
                {days.map((day, colIndex) => {
                  const value = row[day as keyof typeof row] as number;
                  return (
                    <div 
                      key={colIndex} 
                      className="flex-1 mx-0.5"
                    >
                      <div 
                        className="h-10 rounded-sm flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: getCellColor(value) }}
                        title={`${dayLabels[colIndex]} ${row.hour}: ${value} calls`}
                      >
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end">
              <div className="text-xs text-muted-foreground mr-2">Call Volume:</div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm bg-opacity-20 bg-purple-500 mr-1"></div>
                <span className="text-xs mr-2">Low</span>
                <div className="w-4 h-4 rounded-sm bg-opacity-50 bg-purple-500 mr-1"></div>
                <span className="text-xs mr-2">Medium</span>
                <div className="w-4 h-4 rounded-sm bg-purple-500 mr-1"></div>
                <span className="text-xs">High</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeakCallHoursChart;
