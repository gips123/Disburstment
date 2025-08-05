'use client';

import { useState } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useSession, useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function InternalHeader() {
  const { data: session } = useSession();
  const { logout } = useAuth();
  const [notifications] = useState([
    { id: 1, message: 'New merchant registration pending approval', time: '2 min ago' },
    { id: 2, message: 'Top-up request from Merchant ABC', time: '5 min ago' },
    { id: 3, message: 'Disbursement failed for transaction #12345', time: '10 min ago' },
  ]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search merchants, transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {notifications.length}
              </Badge>
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {session?.user?.name || 'Admin User'}
              </span>
            </Button>
          </div>

          {/* Logout */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:block">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 