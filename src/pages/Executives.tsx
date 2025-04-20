
import React from 'react';
import ExecutivesTable from '@/components/ExecutivesTable';
import { executives } from '@/utils/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid2X2, Phone, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Executives = () => {
  // Calculate some quick stats for the executives page
  const totalExecutives = executives.length;
  const onlineExecutives = executives.filter(exec => exec.status === 'online').length;
  const totalCalls = executives.reduce((sum, exec) => sum + exec.totalCalls, 0);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Center Executives</h1>
        <p className="text-muted-foreground">
          Manage and monitor executive performance
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executives</CardTitle>
            <Grid2X2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutives}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="outline" className="mr-1">{onlineExecutives} online</Badge>
              {((onlineExecutives / totalExecutives) * 100).toFixed(0)}% availability
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {(totalCalls / totalExecutives).toFixed(0)} calls per executive
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Calls</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {executives.reduce((sum, exec) => sum + exec.resolvedCalls, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((executives.reduce((sum, exec) => sum + exec.resolvedCalls, 0) / totalCalls) * 100).toFixed(0)}% resolution rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      <ExecutivesTable executives={executives} />
    </div>
  );
};

export default Executives;
