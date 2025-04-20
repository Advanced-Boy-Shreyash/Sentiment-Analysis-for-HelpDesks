
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Executive, ExecutiveStats as ExecutiveStatsType } from '@/utils/types';
import CallVolumeChart from './CallVolumeChart';
import SentimentChart from './SentimentChart';
import DominantEmotionChart from './DominantEmotionChart';
import CustomerEmotionsBarChart from './CustomerEmotionsBarChart';
import EmotionsComparisonChart from './EmotionsComparisonChart';

interface ExecutiveStatsProps {
  executive: Executive;
  stats: ExecutiveStatsType;
}

const ExecutiveStats: React.FC<ExecutiveStatsProps> = ({ executive, stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 animate-fade-in">
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle>Executive Profile</CardTitle>
            <CardDescription>Performance and contact information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={executive.avatar} alt={executive.name} />
              <AvatarFallback>{executive.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold">{executive.name}</h3>
              <p className="text-sm text-muted-foreground">{executive.department}</p>
            </div>
            
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance</span>
                <span
                  className={
                    executive.performance >= 90
                      ? 'text-green-600'
                      : executive.performance >= 70
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }
                >
                  {executive.performance}%
                </span>
              </div>
              <Progress value={executive.performance} className="h-2" />
            </div>
            
            <Separator />
            
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="text-2xl font-bold">{executive.totalCalls}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold">{Math.round(stats.resolvedRate)}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Handling Time</p>
                  <p className="text-2xl font-bold">{executive.averageHandlingTime}m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold">{executive.satisfactionScore.toFixed(1)}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="w-full space-y-2">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">{executive.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">{executive.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Call Volume</CardTitle>
            <CardDescription>Monthly call statistics for the past 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <CallVolumeChart data={stats.callsByMonth} />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Customer sentiment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <SentimentChart 
                positive={stats.sentimentDistribution.positive} 
                neutral={stats.sentimentDistribution.neutral} 
                negative={stats.sentimentDistribution.negative} 
              />
            </CardContent>
          </Card>
          
          <CustomerEmotionsBarChart 
            data={stats.emotionsData || []} 
            dominantEmotion={stats.dominantEmotion}
          />
        </div>
        
        <EmotionsComparisonChart data={stats.emotionsComparisonData || []} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DominantEmotionChart 
            data={stats.emotionsData || []} 
            dominantEmotion={stats.dominantEmotion}
          />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Top Conversation Topics</CardTitle>
              <CardDescription>Most frequent customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{topic.topic}</span>
                      <span className="text-muted-foreground">{topic.count} calls</span>
                    </div>
                    <Progress value={(topic.count / stats.topTopics[0].count) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveStats;
