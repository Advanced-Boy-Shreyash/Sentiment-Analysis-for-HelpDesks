import { User, Executive, Call, DashboardStats, ExecutiveStats } from './types';

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  },
];

export const executives: Executive[] = [
  {
    id: '1',
    name: 'Shreyash',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'shreyash@executive.com',
    phone: '2532353534',
    department: 'Technical Support',
    performance: 94,
    status: 'online',
    totalCalls: 39,
    resolvedCalls: 34,
    averageHandlingTime: 8.5,
    satisfactionScore: 4.7,
    dominantEmotion: 'calm',
  },
  {
    id: '2',
    name: 'Shivam',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'shivam@executive.com',
    phone: '34563426',
    department: 'Customer Service',
    performance: 88,
    status: 'online',
    totalCalls: 27,
    resolvedCalls: 6,
    averageHandlingTime: 6.2,
    satisfactionScore: 4.5,
    dominantEmotion: 'empathetic',
  },
  {
    id: '3',
    name: 'Yashswi',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'yashswi@executive.com',
    phone: '37847834',
    department: 'Billing Support',
    performance: 92,
    status: 'away',
    totalCalls: 7,
    resolvedCalls: 4,
    averageHandlingTime: 7.8,
    satisfactionScore: 4.6,
    dominantEmotion: 'professional',
  },
  {
    id: '4',
    name: 'Shravani',
    avatar: 'https://i.pravatar.cc/150?img=20',
    email: 'shravani@executive.com',
    phone: '789012354',
    department: 'Technical Support',
    performance: 79,
    status: 'offline',
    totalCalls: 8,
    resolvedCalls: 5,
    averageHandlingTime: 9.1,
    satisfactionScore: 4.2,
    dominantEmotion: 'confused',
  },
  // {
  //   id: '5',
  //   name: 'James Taylor',
  //   avatar: 'https://i.pravatar.cc/150?img=8',
  //   email: 'james.taylor@example.com',
  //   phone: '+1 (555) 321-6547',
  //   department: 'Customer Service',
  //   performance: 85,
  //   status: 'online',
  //   totalCalls: 205,
  //   resolvedCalls: 187,
  //   averageHandlingTime: 7.3,
  //   satisfactionScore: 4.4,
  //   dominantEmotion: 'happy',
  // }
];

export const generateCalls = (): Call[] => {
  const calls: Call[] = [];
  const topics = [
    'Account Access', 'Billing Issue', 'Product Information', 
    'Technical Support', 'Service Outage', 'Refund Request',
    'Upgrade Options', 'Installation Help', 'Account Closure',
    'Complaint', 'Password Reset', 'Feature Inquiry'
  ];
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  
  executives.forEach(exec => {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      calls.push({
        id: `${exec.id}-call-${i}`,
        executiveId: exec.id,
        customerId: `cust-${Math.floor(Math.random() * 1000)}`,
        customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
        timestamp: date.toISOString(),
        duration: Math.floor(Math.random() * 900) + 60,
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
        topic: topics[Math.floor(Math.random() * topics.length)],
        resolved: Math.random() > 0.15,
        notes: Math.random() > 0.7 ? 'Customer was satisfied with the resolution.' : undefined,
      });
    }
  });
  
  return calls;
};

export const calls = generateCalls();

export const dashboardStats: DashboardStats = {
  totalCalls: executives.reduce((acc, exec) => acc + exec.totalCalls, 0),
  resolvedCalls: executives.reduce((acc, exec) => acc + exec.resolvedCalls, 0),
  averageHandlingTime: executives.reduce((acc, exec) => acc + exec.averageHandlingTime, 0) / executives.length,
  satisfactionScore: executives.reduce((acc, exec) => acc + exec.satisfactionScore, 0) / executives.length,
  callsToday: 47,
  onlineExecutives: executives.filter(exec => exec.status === 'online').length,
  pendingCalls: 12,
  callsTrend: [38, 42, 35, 30, 45, 48, 47],
  sentimentDistribution: {
    positive: 65,
    neutral: 20,
    negative: 15,
  },
};

export const generateExecutiveStats = (executiveId: string): ExecutiveStats => {
  const executive = executives.find(exec => exec.id === executiveId);
  if (!executive) throw new Error(`Executive with ID ${executiveId} not found`);
  
  const executiveCalls = calls.filter(call => call.executiveId === executiveId);
  
  const callsByMonth: number[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const month = now.getMonth() - i;
    const year = now.getFullYear() - (month < 0 ? 1 : 0);
    const monthAdjusted = month < 0 ? 12 + month : month;
    
    const startDate = new Date(year, monthAdjusted, 1);
    const endDate = new Date(year, monthAdjusted + 1, 0);
    
    const count = executiveCalls.filter(call => {
      const callDate = new Date(call.timestamp);
      return callDate >= startDate && callDate <= endDate;
    }).length;
    
    callsByMonth.unshift(count);
  }
  
  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };
  
  executiveCalls.forEach(call => {
    sentimentCounts[call.sentiment]++;
  });
  
  const topicCounts: Record<string, number> = {};
  executiveCalls.forEach(call => {
    topicCounts[call.topic] = (topicCounts[call.topic] || 0) + 1;
  });
  
  const topTopics = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  const emotionsData = [
    { name: 'Happy', value: Math.floor(Math.random() * 40) + 10 },
    { name: 'Satisfied', value: Math.floor(Math.random() * 30) + 15 },
    { name: 'Neutral', value: Math.floor(Math.random() * 20) + 10 },
    { name: 'Confused', value: Math.floor(Math.random() * 15) + 5 },
    { name: 'Frustrated', value: Math.floor(Math.random() * 10) + 5 },
  ];
  
  let emotionsComparisonData;
  
  if (executive.dominantEmotion === 'calm' || executive.dominantEmotion === 'professional' || executive.dominantEmotion === 'empathetic') {
    emotionsComparisonData = [
      { name: 'Angry', customer: 65, executive: 5 },
      { name: 'Frustrated', customer: 40, executive: 10 },
      { name: 'Confused', customer: 30, executive: 15 },
      { name: 'Neutral', customer: 25, executive: 25 },
      { name: 'Calm', customer: 15, executive: 70 },
      { name: 'Professional', customer: 10, executive: 60 },
      { name: 'Empathetic', customer: 5, executive: 45 }
    ];
  } else {
    emotionsComparisonData = [
      { name: 'Angry', customer: 65, executive: 15 },
      { name: 'Frustrated', customer: 40, executive: 25 },
      { name: 'Confused', customer: 30, executive: 20 },
      { name: 'Neutral', customer: 25, executive: 30 },
      { name: 'Calm', customer: 15, executive: 40 },
      { name: 'Professional', customer: 10, executive: 35 },
      { name: 'Empathetic', customer: 5, executive: 25 }
    ];
  }
  
  const customerAngerResolutionRate = executive.dominantEmotion === 'calm' || 
                                      executive.dominantEmotion === 'professional' || 
                                      executive.dominantEmotion === 'empathetic' 
                                      ? 85 + Math.floor(Math.random() * 10) 
                                      : 65 + Math.floor(Math.random() * 15);
  
  return {
    executiveId,
    name: executive.name,
    totalCalls: executive.totalCalls,
    callsByMonth,
    resolvedRate: (executive.resolvedCalls / executive.totalCalls) * 100,
    averageHandlingTime: executive.averageHandlingTime,
    satisfactionTrend: [4.3, 4.4, 4.5, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.6, 4.7, 4.7],
    sentimentDistribution: {
      positive: (sentimentCounts.positive / executiveCalls.length) * 100,
      neutral: (sentimentCounts.neutral / executiveCalls.length) * 100,
      negative: (sentimentCounts.negative / executiveCalls.length) * 100,
    },
    performanceTrend: [82, 84, 87, 85, 88, 90, 89, 91, 92, 90, 93, 94],
    topTopics,
    emotionsData,
    emotionsComparisonData,
    dominantEmotion: executive.dominantEmotion,
    customerAngerResolutionRate,
  };
};

export const login = (username: string, password: string): User | null => {
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};
