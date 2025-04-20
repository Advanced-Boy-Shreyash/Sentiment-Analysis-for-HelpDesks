
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, Download, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity } from 'lucide-react';

// Define chart type options
const chartTypes = [
  { id: 'bar', name: 'Bar Chart', icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'line', name: 'Line Chart', icon: <LineChartIcon className="h-4 w-4" /> },
  { id: 'area', name: 'Area Chart', icon: <Activity className="h-4 w-4" /> },
  { id: 'pie', name: 'Pie Chart', icon: <PieChartIcon className="h-4 w-4" /> },
];

// Color schemes for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

interface DashboardStat {
  id: number;
  stat_name: string;
  stat_value: number;
  trend_value?: number;
  trend_is_positive?: boolean;
  stat_date: string;
  created_at?: string;
}

interface CallTrend {
  id: number;
  day_name: string;
  call_count: number;
  created_at?: string;
}

interface SentimentDistribution {
  id: number;
  sentiment_type: string;
  percentage: number;
  created_at?: string;
}

interface ExecutivePerformance {
  id: number;
  executive_id?: string;
  executive_name: string;
  status: string;
  performance_score: number;
  total_calls: number;
  resolved_calls: number;
  avg_handling_time: number;
  satisfaction_score: number;
  created_at?: string;
}

interface DataItem {
  name: string;
  value: number;
}

// Define available metrics that can be displayed in charts
const AVAILABLE_METRICS = [
  { id: 'call_trends', name: 'Call Volume by Day', dataKey: 'call_count', nameKey: 'day_name' },
  { id: 'sentiment', name: 'Sentiment Distribution', dataKey: 'percentage', nameKey: 'sentiment_type' },
  { id: 'executive_performance', name: 'Executive Performance', dataKey: 'performance_score', nameKey: 'executive_name' },
  { id: 'executive_calls', name: 'Executive Call Volume', dataKey: 'total_calls', nameKey: 'executive_name' },
  { id: 'resolution_rate', name: 'Resolution Rate', dataKey: 'resolved_calls', nameKey: 'executive_name', customFormat: true },
  { id: 'handling_time', name: 'Average Handling Time', dataKey: 'avg_handling_time', nameKey: 'executive_name' },
  { id: 'satisfaction', name: 'Satisfaction Score', dataKey: 'satisfaction_score', nameKey: 'executive_name' },
];

const CustomChartBuilder = () => {
  const { toast } = useToast();
  const [chartType, setChartType] = useState('bar');
  const [selectedMetric, setSelectedMetric] = useState('call_trends');
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize chart data if needed
  useEffect(() => {
    const initializeData = async () => {
      try {
        const { data: callTrendsData, error } = await supabase
          .from('call_trends')
          .select('*')
          .limit(1);
          
        if (error) {
          console.error('Error checking chart data:', error);
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing chart data:', error);
      }
    };

    if (!isInitialized) {
      initializeData();
    }
  }, [isInitialized]);

  // Fetch available metrics data when initialized
  useEffect(() => {
    if (isInitialized) {
      generateChartData();
    }
  }, [isInitialized, selectedMetric]);

  // Generate chart data based on selected metric
  const generateChartData = async () => {
    if (!selectedMetric) return;
    
    try {
      setLoading(true);
      
      const selectedMetricInfo = AVAILABLE_METRICS.find(m => m.id === selectedMetric);
      if (!selectedMetricInfo) {
        throw new Error('Invalid metric selected');
      }
      
      let data;
      
      // Fetch the appropriate data based on the selected metric
      switch (selectedMetric) {
        case 'call_trends':
          const { data: callData, error: callError } = await supabase
            .from('call_trends')
            .select('*')
            .order('id');
          
          if (callError) throw callError;
          data = callData;
          break;
          
        case 'sentiment':
          const { data: sentimentData, error: sentimentError } = await supabase
            .from('sentiment_distribution')
            .select('*')
            .order('id');
          
          if (sentimentError) throw sentimentError;
          data = sentimentData;
          break;
          
        case 'executive_performance':
        case 'executive_calls':
        case 'resolution_rate':
        case 'handling_time':
        case 'satisfaction':
          const { data: execData, error: execError } = await supabase
            .from('executive_performance')
            .select('*')
            .order('id');
          
          if (execError) throw execError;
          
          // For resolution rate, we need to calculate it
          if (selectedMetric === 'resolution_rate') {
            data = execData.map((item: ExecutivePerformance) => ({
              ...item,
              resolved_calls: Math.round((item.resolved_calls / item.total_calls) * 100)
            }));
          } else {
            data = execData;
          }
          break;
          
        default:
          throw new Error('Unknown metric type');
      }
      
      if (data && data.length > 0) {
        // Format data for the chart
        const formattedData: DataItem[] = data.map((item: any) => ({
          name: item[selectedMetricInfo.nameKey],
          value: item[selectedMetricInfo.dataKey]
        }));
        
        // Sort data for better visualization
        formattedData.sort((a, b) => b.value - a.value);
        
        // Generate insights based on data
        generateInsights(formattedData, selectedMetricInfo.name);
        
        setChartData(formattedData);
      } else {
        setChartData([]);
        setInsight('No data available for the selected criteria.');
      }
      
    } catch (error) {
      console.error('Error generating chart data:', error);
      toast({
        title: "Error",
        description: "Failed to generate chart data: " + (error.message || "Unknown error"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate insights based on chart data
  const generateInsights = (data: DataItem[], metricName: string) => {
    if (!data || data.length === 0) {
      setInsight('No data available for insights.');
      return;
    }
    
    // Find highest and lowest values
    const highest = [...data].sort((a, b) => b.value - a.value)[0];
    const lowest = [...data].sort((a, b) => a.value - b.value)[0];
    
    // Calculate average
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    const average = sum / data.length;
    
    // Count values above average
    const aboveAverage = data.filter(item => item.value > average).length;
    
    // Generate specialized insights based on metric
    let specializedInsight = '';
    
    switch (selectedMetric) {
      case 'call_trends':
        specializedInsight = `<li>Call volume peaks on ${highest.name} (${highest.value} calls)</li>
                              <li>Consider increasing staffing during peak periods</li>
                              <li>Lowest call volume on ${lowest.name} (${lowest.value} calls)</li>`;
        break;
      case 'sentiment':
        specializedInsight = `<li>${highest.name} sentiment is dominant at ${highest.value}%</li>
                              <li>${lowest.name} sentiment is at ${lowest.value}%</li>`;
        break;
      case 'executive_performance':
        specializedInsight = `<li>Top performer: ${highest.name} (${highest.value}%)</li>
                              <li>Training opportunity: ${lowest.name} (${lowest.value}%)</li>`;
        break;
      case 'executive_calls':
        specializedInsight = `<li>Highest workload: ${highest.name} (${highest.value} calls)</li>
                              <li>Lowest workload: ${lowest.name} (${lowest.value} calls)</li>
                              <li>Workload distribution may need adjustment</li>`;
        break;
      case 'resolution_rate':
        specializedInsight = `<li>Best resolution rate: ${highest.name} (${highest.value}%)</li>
                              <li>Areas needing improvement: ${lowest.name} (${lowest.value}%)</li>`;
        break;
      case 'handling_time':
        specializedInsight = `<li>Fastest average calls: ${lowest.name} (${lowest.value} minutes)</li>
                              <li>Longest average calls: ${highest.name} (${highest.value} minutes)</li>`;
        break;
      case 'satisfaction':
        specializedInsight = `<li>Highest satisfaction: ${highest.name} (${highest.value}/5)</li>
                              <li>Customer experience should be reviewed for ${lowest.name} (${lowest.value}/5)</li>`;
        break;
      default:
        specializedInsight = '';
    }
    
    // Generate insight text
    const insightText = `
      <span class="font-bold">Key Insights for ${metricName}:</span>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Highest value: ${highest.name} (${highest.value})</li>
        <li>Lowest value: ${lowest.name} (${lowest.value})</li>
        <li>Average value: ${average.toFixed(2)}</li>
        <li>${aboveAverage} out of ${data.length} categories are above average</li>
        ${specializedInsight}
        <li>Data range: ${lowest.value} to ${highest.value}</li>
        <li>Total sum: ${sum}</li>
      </ul>
    `;
    
    setInsight(insightText);
  };

  // Refresh data
  const handleRefresh = () => {
    if (selectedMetric) {
      generateChartData();
      toast({
        title: "Refreshed",
        description: "Chart data has been refreshed",
      });
    }
  };

  // Download chart as image (placeholder function)
  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: "Chart download functionality would go here",
    });
  };

  // Render the appropriate chart based on the selected chart type
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
          <BarChart2 className="h-12 w-12 mb-4 opacity-20" />
          <p>Select metric to generate chart</p>
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary">{`Value: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary">{`Value: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary">{`Value: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-primary">{`Value: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Custom Chart Builder</CardTitle>
            <CardDescription>Create insights from your call center data</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={loading || !selectedMetric}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              disabled={chartData.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ResizablePanelGroup direction="vertical" className="min-h-[600px]">
          <ResizablePanel defaultSize={25}>
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="chart-type" className="text-sm font-medium">Chart Type</Label>
                  <Select
                    value={chartType}
                    onValueChange={setChartType}
                  >
                    <SelectTrigger id="chart-type" className="w-full">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metric" className="text-sm font-medium">Metric</Label>
                  <Select
                    value={selectedMetric}
                    onValueChange={setSelectedMetric}
                  >
                    <SelectTrigger id="metric" className="w-full">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_METRICS.map((metric) => (
                        <SelectItem key={metric.id} value={metric.id}>
                          {metric.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={generateChartData} 
                    disabled={!selectedMetric || loading}
                    className="w-full"
                  >
                    {loading ? 'Loading...' : 'Generate Chart'}
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={75}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 h-full">
              <div className="lg:col-span-2 border rounded-xl overflow-hidden bg-card p-4 h-full flex flex-col">
                <h3 className="text-lg font-medium mb-4 px-2">
                  {selectedMetric ? 
                    `${AVAILABLE_METRICS.find(m => m.id === selectedMetric)?.name || 'Chart'} Analysis` : 
                    'Chart Preview'}
                </h3>
                <div className="flex-1 flex items-center justify-center min-h-[300px]">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    renderChart()
                  )}
                </div>
              </div>
              
              <div className="border rounded-xl p-4 bg-card">
                <h3 className="text-lg font-medium mb-4">Insights</h3>
                <div className="prose prose-sm max-w-none">
                  {insight ? (
                    <div dangerouslySetInnerHTML={{ __html: insight }} />
                  ) : (
                    <div className="text-muted-foreground">
                      Generate a chart to see insights about your data.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default CustomChartBuilder;
