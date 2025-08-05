'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Check,
  X,
  FileText,
  Users,
  CreditCard
} from 'lucide-react';

export default function ExternalApprovalsPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data
  const approvals = [
    {
      id: 'APV-001',
      type: 'DISBURSEMENT',
      entityName: 'John Doe',
      description: 'Disbursement to John Doe - Rp 5,000,000',
      maker: 'Alice Brown',
      createdAt: '2024-01-15 10:30',
      status: 'PENDING',
      data: {
        recipientName: 'John Doe',
        recipientAccount: '1234567890',
        recipientBank: 'BCA',
        amount: 5000000,
        description: 'Salary payment',
      }
    },
    {
      id: 'APV-002',
      type: 'USER_CREATION',
      entityName: 'New User Registration',
      description: 'New user registration for Bob Wilson',
      maker: 'Charlie Davis',
      createdAt: '2024-01-15 09:15',
      status: 'PENDING',
      data: {
        name: 'Bob Wilson',
        email: 'bob@company.com',
        phone: '+62 812-3456-7890',
        role: 'MAKER',
      }
    },
    {
      id: 'APV-003',
      type: 'DISBURSEMENT',
      entityName: 'Jane Smith',
      description: 'Disbursement to Jane Smith - Rp 2,500,000',
      maker: 'David Wilson',
      createdAt: '2024-01-15 08:45',
      status: 'APPROVED',
      data: {
        recipientName: 'Jane Smith',
        recipientAccount: '0987654321',
        recipientBank: 'Mandiri',
        amount: 2500000,
        description: 'Bonus payment',
      }
    },
    {
      id: 'APV-004',
      type: 'USER_CREATION',
      entityName: 'User Registration',
      description: 'New user registration for Eve Johnson',
      maker: 'Frank Miller',
      createdAt: '2024-01-15 08:30',
      status: 'REJECTED',
      data: {
        name: 'Eve Johnson',
        email: 'eve@company.com',
        phone: '+62 813-9876-5432',
        role: 'CHECKER',
      }
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DISBURSEMENT':
        return <FileText className="h-4 w-4" />;
      case 'USER_CREATION':
        return <Users className="h-4 w-4" />;
      case 'TOP_UP':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DISBURSEMENT':
        return 'bg-purple-100 text-purple-800';
      case 'USER_CREATION':
        return 'bg-orange-100 text-orange-800';
      case 'TOP_UP':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApprovals = approvals.filter(approval => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return approval.status === 'PENDING';
    if (activeTab === 'approved') return approval.status === 'APPROVED';
    if (activeTab === 'rejected') return approval.status === 'REJECTED';
    return true;
  });

  const pendingCount = approvals.filter(a => a.status === 'PENDING').length;
  const approvedCount = approvals.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = approvals.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval Queue</h1>
          <p className="text-gray-600">Review and approve pending requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-yellow-100 text-yellow-800">
            {pendingCount} Pending
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvals.length}</div>
            <p className="text-xs text-muted-foreground">
              All time requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Successfully approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">
              Rejected requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Approval List */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({approvals.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredApprovals.map((approval) => (
                  <div key={approval.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getTypeColor(approval.type)}`}>
                          {getTypeIcon(approval.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{approval.entityName}</h3>
                            <Badge className={getStatusColor(approval.status)}>
                              {approval.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{approval.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Maker: {approval.maker}</span>
                            <span>Created: {approval.createdAt}</span>
                          </div>
                          {approval.type === 'DISBURSEMENT' && (
                            <div className="mt-2 text-xs text-gray-600">
                              <span>Amount: Rp {approval.data.amount?.toLocaleString()}</span>
                              <span className="mx-2">•</span>
                              <span>Bank: {approval.data.recipientBank}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {approval.status === 'PENDING' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 