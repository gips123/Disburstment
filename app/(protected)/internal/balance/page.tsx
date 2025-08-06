'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { MerchantBalancesTable } from './components/MerchantBalancesTable';
import { merchants, topUpHistory } from './data/dummy-balance';

export default function BalancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopUpForm, setShowTopUpForm] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balance Management</h1>
          <p className="text-gray-600">Manage merchant balances and top-up requests</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setShowTopUpForm(!showTopUpForm)}>
          <Plus className="h-4 w-4" />
          <span>Process Top-up</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards merchants={merchants} topUpHistory={topUpHistory} />

      {/* Merchant Balances */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Merchant Balances</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search merchants..."
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
          <MerchantBalancesTable merchants={merchants} searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
} 