'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCards } from './components/StatsCards';
import { ApprovalList } from './components/ApprovalList';
import { approvals } from './data/dummy-approvals';

export default function ExternalApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval Queue</h1>
          <p className="text-gray-600">Review and approve pending requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="w-full">
        <StatsCards approvals={approvals} />
      </div>

      {/* Approval List */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Pending Approvals</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search approvals..."
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
          <ApprovalList 
            approvals={approvals} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </CardContent>
      </Card>
    </div>
  );
} 