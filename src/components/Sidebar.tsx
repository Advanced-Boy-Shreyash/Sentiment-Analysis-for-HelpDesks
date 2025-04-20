
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { BarChart, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <BarChart className="h-5 w-5" />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Executives',
      href: '/executives',
    }
  ];

  return (
    <aside
      className={cn(
        'h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col',
        isOpen ? 'w-56' : 'w-16'
      )}
    >
      <div className="p-4 flex justify-between items-center h-16 border-b border-border">
        <div
          className={cn(
            'font-bold text-xl transition-opacity',
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          )}
        >
          CallTrack
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.href}>
                <Button
                  variant={
                    location.pathname.startsWith(item.href)
                      ? 'default'
                      : 'ghost'
                  }
                  className={cn(
                    'w-full justify-start mb-1',
                    !isOpen && 'justify-center'
                  )}
                >
                  {item.icon}
                  {isOpen && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto mb-4">
        <Separator className="my-4" />
        <div className="px-4">
          <div
            className={cn(
              'text-xs text-muted-foreground transition-opacity',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
          >
            {isOpen ? 'Call Center Analytics' : ''}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
