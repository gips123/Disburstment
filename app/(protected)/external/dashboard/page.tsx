'use client';

import { Button } from '@/components/ui/button';
import { Plus, CreditCard, FileText, CheckCircle2, Users, AlertTriangle, Clock } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { RecentTransactions } from './components/RecentTransactions';
import { stats, recentTransactions } from './data/dummy-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExternalDashboard() {
  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
          <p className="text-gray-600">Welcome back, Merchant ABC</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Disbursement</span>
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

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span>1 failed transaction today</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-yellow-600">
              <Clock className="h-4 w-4" />
              <span>3 pending approvals</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Users className="h-4 w-4" />
              <span>2 new user registrations</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Account Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Login</span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 