
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'executive';
}

export interface Executive {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  performance: number;
  status: 'online' | 'offline' | 'away';
  totalCalls: number;
  resolvedCalls: number;
  averageHandlingTime: number;
  satisfactionScore: number;
  dominantEmotion?: 'happy' | 'satisfied' | 'neutral' | 'confused' | 'frustrated' | 'angry' | 'calm' | 'empathetic' | 'professional';
  transferRate?: number;
  firstCallResolutionRate?: number;
  slaComplianceRate?: number;
  responseTime?: number;
}

export interface Call {
  id: string;
  executiveId: string;
  customerId: string;
  customerName: string;
  timestamp: string;
  duration: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  topic: string;
  resolved: boolean;
  notes?: string;
  customerEmotion?: 'happy' | 'satisfied' | 'neutral' | 'confused' | 'frustrated' | 'angry';
  executiveEmotion?: 'happy' | 'satisfied' | 'neutral' | 'calm' | 'empathetic' | 'professional';
  transferred?: boolean;
  transferredTo?: string;
  slaCompliant?: boolean;
}

export interface DashboardStats {
  totalCalls: number;
  resolvedCalls: number;
  averageHandlingTime: number;
  satisfactionScore: number;
  callsToday: number;
  onlineExecutives: number;
  pendingCalls: number;
  callsTrend: number[];
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface ExecutiveStats {
  executiveId?: string;
  name?: string;
  totalCalls?: number;
  callsByMonth: number[];
  resolvedRate: number;
  averageHandlingTime?: number;
  satisfactionTrend?: number[];
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  performanceTrend?: number[];
  topTopics: Array<{topic: string, count: number}>;
  emotionsData?: Array<{name: string, value: number}>;
  emotionsComparisonData?: Array<{
    name: string, 
    customer: number, 
    executive: number
  }>;
  dominantEmotion?: string;
  customerAngerResolutionRate?: number;
  transferRate?: number;
  fcrByCategory?: Array<{category: string, rate: number}>;
  slaCompliance?: number;
  productivityScore?: Array<{subject: string, A: number, B?: number, fullMark: number}>;
}
