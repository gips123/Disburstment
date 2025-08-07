'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from './components/StatsCards';
import { ApprovalList } from './components/ApprovalList';
import { approvals as initialApprovals } from './data/dummy-approvals';
import { merchants as initialMerchants } from '../merchants/data/dummy-merchants';

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [approvals, setApprovals] = useState(initialApprovals);
  const [merchants, setMerchants] = useState(initialMerchants);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Antrian Persetujuan</h1>
          <p className="text-gray-600">Tinjau dan setujui permintaan yang menunggu</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-yellow-100 text-yellow-800">
            {approvals.filter(a => a.status === 'PENDING').length} Menunggu
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards approvals={approvals} />

      {/* Approval List */}
      <Card>
        <CardHeader>
          <CardTitle>Permintaan Persetujuan</CardTitle>
        </CardHeader>
        <CardContent>
          <ApprovalList 
            approvals={approvals} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            setMerchants={setMerchants}
            setApprovals={setApprovals}
          />
        </CardContent>
      </Card>
    </div>
  );
}