
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ResolutionGaugeChartProps {
  value: number;
  title?: string;
  subtitle?: string;
}

const ResolutionGaugeChart: React.FC<ResolutionGaugeChartProps> = ({ 
  value,
  title = "First Call Resolution Rate",
  subtitle = "Percentage of issues resolved on first contact" 
}) => {
  const getColorClass = (val: number) => {
    if (val >= 85) return "text-green-600";
    if (val >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="10"
              />
              
              {/* Progress arc - we'll draw just the visible part of the circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
                strokeDashoffset="70.75" // This offsets to start at the top (rotate -90 degrees)
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getColorClass(value)}`}>{value}%</span>
              <span className="text-xs text-muted-foreground">Resolution Rate</span>
            </div>
          </div>
          
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Target: 85%</span>
              <span className={getColorClass(value)}>{value}%</span>
            </div>
            <Progress value={value} className="h-2" />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {value >= 85
              ? "Excellent resolution rate!"
              : value >= 70
              ? "Good resolution rate, but there's room for improvement."
              : "Resolution rate needs improvement."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResolutionGaugeChart;
