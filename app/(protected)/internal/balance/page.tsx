'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { MerchantBalancesTable } from './components/MerchantBalancesTable';
import { merchants, topUpHistory } from './data/dummy-balance';

export default function BalancePage() {
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

      {/* Merchant Balances Table */}
      <MerchantBalancesTable merchants={merchants} />
    </div>
  );
}