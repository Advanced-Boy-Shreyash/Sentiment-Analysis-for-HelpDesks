
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface PerformanceMetric {
  name: string;
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  avgHandlingTime: number;
  resolvedRate: number;
  satisfactionScore: number;
  status: 'online' | 'offline' | 'break';
}

interface PerformanceScorecardProps {
  data: PerformanceMetric[];
  title?: string;
  subtitle?: string;
}

const PerformanceScorecard: React.FC<PerformanceScorecardProps> = ({ 
  data,
  title = "Agent Performance Scorecard",
  subtitle = "Key performance metrics for call center agents" 
}) => {
  // Default data if none is provided
  const defaultData: PerformanceMetric[] = [
    {
      name: 'Jane Smith',
      totalCalls: 145,
      answeredCalls: 138,
      missedCalls: 7,
      avgHandlingTime: 4.2,
      resolvedRate: 92,
      satisfactionScore: 4.8,
      status: 'online'
    },
    {
      name: 'John Doe',
      totalCalls: 132,
      answeredCalls: 121,
      missedCalls: 11,
      avgHandlingTime: 3.8,
      resolvedRate: 85,
      satisfactionScore: 4.5,
      status: 'offline'
    },
    {
      name: 'Alice Johnson',
      totalCalls: 156,
      answeredCalls: 149,
      missedCalls: 7,
      avgHandlingTime: 4.5,
      resolvedRate: 94,
      satisfactionScore: 4.9,
      status: 'online'
    },
    {
      name: 'Bob Williams',
      totalCalls: 118,
      answeredCalls: 105,
      missedCalls: 13,
      avgHandlingTime: 5.2,
      resolvedRate: 82,
      satisfactionScore: 4.3,
      status: 'break'
    },
    {
      name: 'Carol Martinez',
      totalCalls: 128,
      answeredCalls: 120,
      missedCalls: 8,
      avgHandlingTime: 4.1,
      resolvedRate: 90,
      satisfactionScore: 4.7,
      status: 'online'
    }
  ];

  const tableData = data.length ? data : defaultData;

  const getStatusBadge = (status: 'online' | 'offline' | 'break') => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="outline">Offline</Badge>;
      case 'break':
        return <Badge className="bg-yellow-500">Break</Badge>;
      default:
        return null;
    }
  };

  const getColorClass = (value: number, type: 'resolvedRate' | 'satisfactionScore') => {
    if (type === 'resolvedRate') {
      if (value >= 90) return "text-green-600";
      if (value >= 80) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value >= 4.5) return "text-green-600";
      if (value >= 4.0) return "text-yellow-600";
      return "text-red-600";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Calls</TableHead>
                <TableHead className="text-right">Answered</TableHead>
                <TableHead className="text-right">Missed</TableHead>
                <TableHead className="text-right">Avg Time (min)</TableHead>
                <TableHead className="text-right">Resolution %</TableHead>
                <TableHead className="text-right">CSAT (1-5)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                  <TableCell className="text-right">{row.totalCalls}</TableCell>
                  <TableCell className="text-right">{row.answeredCalls}</TableCell>
                  <TableCell className="text-right">{row.missedCalls}</TableCell>
                  <TableCell className="text-right">{row.avgHandlingTime.toFixed(1)}</TableCell>
                  <TableCell className={`text-right ${getColorClass(row.resolvedRate, 'resolvedRate')}`}>
                    {row.resolvedRate}%
                  </TableCell>
                  <TableCell className={`text-right ${getColorClass(row.satisfactionScore, 'satisfactionScore')}`}>
                    {row.satisfactionScore.toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceScorecard;
