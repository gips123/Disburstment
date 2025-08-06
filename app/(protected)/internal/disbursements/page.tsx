'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { DisbursementsTable } from './components/DisbursementsTable';
import { disbursements } from './data/dummy-disbursements';

export default function InternalDisbursementsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Disbursements</h1>
          <p className="text-gray-600">Monitor all disbursement transactions across merchants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards disbursements={disbursements} />

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <button className="btn btn-outline btn-sm flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DisbursementsTable disbursements={disbursements} searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
} 