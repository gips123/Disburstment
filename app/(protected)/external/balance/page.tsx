'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { TopUpHistoryTable } from './components/TopUpHistoryTable';
import { balanceInfo, topUpHistory } from './data/dummy-balance';

export default function ExternalBalancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopUpForm, setShowTopUpForm] = useState(false);

  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balance & Top-up</h1>
          <p className="text-gray-600">Manage your merchant balance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export History</span>
          </Button>
          <Button className="flex items-center space-x-2" onClick={() => setShowTopUpForm(!showTopUpForm)}>
            <Plus className="h-4 w-4" />
            <span>Request Top-up</span>
          </Button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="w-full">
        <StatsCards balanceInfo={balanceInfo} />
      </div>

      {/* Top-up History */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Top-up History</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search top-up history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TopUpHistoryTable topUpHistory={topUpHistory} searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
} 