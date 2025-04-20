
import React, { useState, useEffect } from 'react';
import StatisticCard from '@/components/StatisticCard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Phone,
  Users,
  Timer,
  CheckCircle,
  BarChart2,
  TrendingUp,
  Clock,
} from 'lucide-react';
import CustomChartBuilder from '@/components/CustomChartBuilder';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import PeakCallHoursChart from '@/components/PeakCallHoursChart';
import CallStatusChart from '@/components/CallStatusChart';
import CategoryCallsChart from '@/components/CategoryCallsChart';
import SatisfactionScoreChart from '@/components/SatisfactionScoreChart';
import PerformanceScorecard from '@/components/PerformanceScorecard';
import AgentComparisonChart from '@/components/AgentComparisonChart';

interface DashboardStat {
  stat_name: string;
  stat_value: number;
  trend_value: number | null;
  trend_is_positive: boolean | null;
}

interface CallTrend {
  day_name: string;
  call_count: number;
}

interface SentimentDistribution {
  sentiment_type: string;
  percentage: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, DashboardStat>>({});
  const [callTrendData, setCallTrendData] = useState<CallTrend[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentDistribution[]>([]);
  const [performanceData, setPerformanceData] = useState<Array<{name: string, value: number}>>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const { data: statsData, error: statsError } = await supabase
        .from('dashboard_stats')
        .select('*')
        .order('stat_date', { ascending: false });
      
      if (statsError) throw statsError;
      
      // Transform stats data into a usable format
      const statsRecord: Record<string, DashboardStat> = {};
      statsData?.forEach(stat => {
        statsRecord[stat.stat_name] = stat;
      });
      
      // Fetch call trend data
      const { data: callTrends, error: callTrendsError } = await supabase
        .from('call_trends')
        .select('*')
        .order('id', { ascending: true });
      
      if (callTrendsError) throw callTrendsError;
      
      // Fetch sentiment distribution data
      const { data: sentiments, error: sentimentsError } = await supabase
        .from('sentiment_distribution')
        .select('*');
      
      if (sentimentsError) throw sentimentsError;

      // Fetch executive performance
      const { data: executives, error: executivesError } = await supabase
        .from('executive_performance')
        .select('*')
        .limit(5);
      
      if (executivesError) throw executivesError;
      
      setStats(statsRecord);
      setCallTrendData(callTrends || []);
      setSentimentData(sentiments || []);
      setPerformanceData((executives || []).map(exec => ({
        name: exec.executive_name,
        value: exec.performance_score
      })));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatValue = (statName: string): number => {
    console.log(stats)
    return stats[statName]?.stat_value || 0;
  };

  const getStatTrend = (statName: string): { value: number; isPositive: boolean } | undefined => {
    const stat = stats[statName];
    if (!stat) return undefined;
    
    if (stat.trend_value !== null && stat.trend_value !== undefined && 
        stat.trend_is_positive !== null && stat.trend_is_positive !== undefined) {
      return {
        value: stat.trend_value,
        isPositive: stat.trend_is_positive
      };
    }
    return undefined;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of call center performance and key metrics
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Total Calls"
          value={getStatValue('total_calls')}
          icon={<Phone className="h-4 w-4" />}
          trend={getStatTrend('total_calls')}
          description="Total calls received to date"
        />
        <StatisticCard
          title="Calls Today"
          value={getStatValue('calls_today')}
          icon={<Clock className="h-4 w-4" />}
          trend={getStatTrend('calls_today')}
          description="Calls received today"
        />
        <StatisticCard
          title="Online Executives"
          value={`${getStatValue('online_executives')}/${getStatValue('total_executives')}`}
          icon={<Users className="h-4 w-4" />}
          description="Executives currently available"
        />
        <StatisticCard
          title="Avg. Handling Time"
          value={`${getStatValue('average_handling_time').toFixed(1)}m`}
          icon={<Timer className="h-4 w-4" />}
          trend={getStatTrend('average_handling_time')}
          description="Average time per call"
        />
      </div>

      {/* Top row charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Call Volume</CardTitle>
            <CardDescription>Daily call volume for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            {!loading && (
              <CategoryCallsChart 
                title="Call Volume by Category"
                subtitle="Distribution of calls by category type"
              />
            )}
          </CardContent>
        </Card>

        <CallStatusChart 
          title="Call Status Breakdown"
          subtitle="Distribution of answered, missed, and dropped calls" 
        />
      </div>

      {/* Agent comparison and scorecard */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <AgentComparisonChart 
          title="Agent Performance Comparison"
          subtitle="Call volume and handling time by executive"
        />
        
        <SatisfactionScoreChart 
          title="Customer Satisfaction Score"
          subtitle="CSAT scores by period"
        />
      </div>

      {/* Peak hours heatmap */}
      <PeakCallHoursChart 
        title="Peak Call Hours"
        subtitle="Call volume heatmap by day and hour"
      />

      {/* Agent performance scorecard */}
      <PerformanceScorecard 
        data={[]}
        title="Executive Performance Scorecard"
        subtitle="Key performance metrics for call center executives"
      />

      {/* Bottom stats row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Resolved Calls"
          value={`${getStatValue('resolved_calls')}%`}
          icon={<CheckCircle className="h-4 w-4" />}
          trend={getStatTrend('resolved_calls')}
          description="Call resolution rate"
        />
        <StatisticCard
          title="Pending Calls"
          value={getStatValue('pending_calls')}
          icon={<Clock className="h-4 w-4" />}
          trend={getStatTrend('pending_calls')}
          description="Calls waiting to be resolved"
        />
        <StatisticCard
          title="Satisfaction Score"
          value={getStatValue('satisfaction_score').toFixed(1)}
          icon={<BarChart2 className="h-4 w-4" />}
          trend={getStatTrend('satisfaction_score')}
          description="Average customer satisfaction"
        />
        <StatisticCard
          title="Call Growth"
          value={`${getStatValue('call_growth')}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={getStatTrend('call_growth')}
          description="Growth compared to last month"
        />
      </div>

      {/* Custom Chart Builder */}
      <CustomChartBuilder />
    </div>
  );
};

export default Dashboard;
