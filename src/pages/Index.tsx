
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Headphones, BarChart2, Users, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/login');
  };

  // Colors used throughout the landing page - student projects often define these explicitly
  const gradients = {
    primary: 'from-blue-500 to-indigo-600',
    secondary: 'from-purple-500 to-pink-500',
    accent: 'from-teal-400 to-cyan-500'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-blue-900/20 p-4">
      <Card className="w-full max-w-4xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-primary/10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <CardHeader className="text-center space-y-4 pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Headphones className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CallCenter Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-lg">
            Final Year Project - CS4023 Advanced Software Engineering
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Feature boxes - students love these */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Monitor call metrics and performance data as it happens
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Executive Tracking</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Analyze individual performance and emotional responses
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-6 rounded-xl">
              <div className="bg-gradient-to-br from-teal-400 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Emotion Analysis</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Track customer sentiment and executive response patterns
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Project Overview</h3>
              <p className="text-muted-foreground text-sm">
                This dashboard application provides real-time analytics for call center operations, 
                helping managers monitor executive performance and customer interactions with advanced visualization tools.
                The system uses sentiment analysis and natural language processing to extract emotional context from calls.
              </p>
              
              {/* Version info - students always add these */}
              <div className="flex gap-2 mt-4">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">v1.0.4</span>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded">Beta</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Technologies Used</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  React with TypeScript
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Tailwind CSS
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Recharts
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  React Router
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  React Query
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Supabase
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-4 text-center">Team Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-card/80">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">AS</span>
                </div>
                <p className="font-medium">Aiden Smith</p>
                <p className="text-xs text-muted-foreground">Frontend Development</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/80">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">PP</span>
                </div>
                <p className="font-medium">Priya Patel</p>
                <p className="text-xs text-muted-foreground">Data Visualization</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/80">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 font-semibold">JL</span>
                </div>
                <p className="font-medium">Jordan Lee</p>
                <p className="text-xs text-muted-foreground">Backend Integration</p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 pt-4 pb-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-white px-8 py-2 rounded-lg shadow-md" onClick={handleGetStarted}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="text-center text-sm text-muted-foreground pt-4">
            © 2025 | State University Computer Science Department<br/>
            <span className="text-xs">Version 1.0.4-beta • Last updated: April 2, 2025</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
