'use client';

import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { RecentTransactions } from './components/RecentTransactions';
import { stats, recentTransactions } from './data/dummy-dashboard';

export default function InternalDashboard() {
  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internal Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="w-full">
        <StatsCards stats={stats} />
      </div>

      {/* Recent Transactions */}
      <div className="w-full">
        <RecentTransactions recentTransactions={recentTransactions} />
      </div>
    </div>
  );
} 