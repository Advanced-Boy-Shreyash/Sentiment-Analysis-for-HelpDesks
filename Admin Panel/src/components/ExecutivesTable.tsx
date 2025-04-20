
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Executive } from '@/utils/types';
import { Search, MoreHorizontal, Phone, Mail, ArrowUpDown } from 'lucide-react';

interface ExecutivesTableProps {
  executives: Executive[];
}

const ExecutivesTable: React.FC<ExecutivesTableProps> = ({ executives }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Executive>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const handleSort = (field: keyof Executive) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExecutives = [...executives]
    .filter((exec) => 
      exec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exec.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleViewDetails = (execId: string) => {
    navigate(`/executives/${execId}`);
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="pb-3 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Call Center Executives</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search executives..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <Button 
                    variant="ghost" 
                    className="font-medium p-0 hover:bg-transparent" 
                    onClick={() => handleSort('name')}
                  >
                    Executive
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="font-medium p-0 hover:bg-transparent" 
                    onClick={() => handleSort('department')}
                  >
                    Department
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    className="font-medium p-0 hover:bg-transparent" 
                    onClick={() => handleSort('status')}
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    className="font-medium p-0 hover:bg-transparent" 
                    onClick={() => handleSort('totalCalls')}
                  >
                    Total Calls
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    className="font-medium p-0 hover:bg-transparent" 
                    onClick={() => handleSort('performance')}
                  >
                    Performance
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedExecutives.map((executive) => (
                <TableRow 
                  key={executive.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewDetails(executive.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={executive.avatar} alt={executive.name} />
                        <AvatarFallback>{executive.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{executive.name}</div>
                        <div className="text-xs text-muted-foreground">{executive.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{executive.department}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          executive.status === 'online'
                            ? 'bg-green-500'
                            : executive.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-300'
                        }`}
                      />
                      <span
                        className={
                          executive.status === 'online'
                            ? 'text-green-600'
                            : executive.status === 'away'
                            ? 'text-yellow-600'
                            : 'text-gray-500'
                        }
                      >
                        {executive.status.charAt(0).toUpperCase() + executive.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{executive.totalCalls}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <span
                        className={`font-medium ${
                          executive.performance >= 90
                            ? 'text-green-600'
                            : executive.performance >= 70
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {executive.performance}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${executive.phone}`);
                          }}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`mailto:${executive.email}`);
                          }}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {sortedExecutives.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No executives found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutivesTable;
