'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function InternalDisbursementsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const disbursements = [
    {
      id: 'TRX-001',
      merchantName: 'Merchant ABC',
      recipientName: 'John Doe',
      recipientAccount: '1234567890',
      recipientBank: 'BCA',
      amount: 5000000,
      description: 'Salary payment',
      status: 'SUCCESS',
      createdAt: '2024-01-15 10:30',
      processedAt: '2024-01-15 10:35',
      maker: 'Alice Brown',
      checker: 'Bob Wilson',
    },
    {
      id: 'TRX-002',
      merchantName: 'Merchant XYZ',
      recipientName: 'Jane Smith',
      recipientAccount: '0987654321',
      recipientBank: 'Mandiri',
      amount: 2500000,
      description: 'Bonus payment',
      status: 'PENDING',
      createdAt: '2024-01-15 09:15',
      processedAt: null,
      maker: 'Charlie Davis',
      checker: null,
    },
    {
      id: 'TRX-003',
      merchantName: 'Merchant DEF',
      recipientName: 'Bob Wilson',
      recipientAccount: '1122334455',
      recipientBank: 'BNI',
      amount: 10000000,
      description: 'Commission payment',
      status: 'FAILED',
      createdAt: '2024-01-15 08:45',
      processedAt: null,
      failureReason: 'Invalid account number',
      maker: 'David Miller',
      checker: 'Eve Johnson',
    },
    {
      id: 'TRX-004',
      merchantName: 'Merchant ABC',
      recipientName: 'Alice Brown',
      recipientAccount: '5566778899',
      recipientBank: 'BRI',
      amount: 7500000,
      description: 'Performance bonus',
      status: 'SUCCESS',
      createdAt: '2024-01-15 08:30',
      processedAt: '2024-01-15 08:35',
      maker: 'Frank Wilson',
      checker: 'Grace Lee',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4" />;
      case 'PENDING':
        return <Clock className="h-4 w-4" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4" />;
      case 'PROCESSING':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredDisbursements = disbursements.filter(disbursement =>
    disbursement.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.recipientBank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = disbursements.reduce((sum, d) => sum + d.amount, 0);
  const successCount = disbursements.filter(d => d.status === 'SUCCESS').length;
  const pendingCount = disbursements.filter(d => d.status === 'PENDING').length;
  const failedCount = disbursements.filter(d => d.status === 'FAILED').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Disbursements</h1>
          <p className="text-gray-600">Monitor all disbursement transactions across merchants</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button>View Analytics</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disbursements.length}</div>
            <p className="text-xs text-muted-foreground">
              All time transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalAmount / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Total disbursed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((successCount / disbursements.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Successful transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
            <p className="text-xs text-muted-foreground">
              Failed transactions
            </p>
          </CardContent>
        </Card>
      </div>

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
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium">Recipient</th>
                  <th className="text-left py-3 px-4 font-medium">Bank</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Maker/Checker</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisbursements.map((disbursement) => (
                  <tr key={disbursement.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium">{disbursement.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{disbursement.merchantName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">{disbursement.recipientName}</div>
                        <div className="text-sm text-gray-600">{disbursement.recipientAccount}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{disbursement.recipientBank}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        Rp {disbursement.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(disbursement.status)}
                        <Badge className={getStatusColor(disbursement.status)}>
                          {disbursement.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div>Maker: {disbursement.maker}</div>
                        {disbursement.checker && (
                          <div>Checker: {disbursement.checker}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {disbursement.createdAt}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Failed Transactions */}
      {failedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Failed Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disbursements.filter(d => d.status === 'FAILED').map((disbursement) => (
                <div key={disbursement.id} className="border rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-red-100">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{disbursement.id}</h3>
                          <Badge className="bg-red-100 text-red-800">
                            FAILED
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {disbursement.recipientName} - Rp {disbursement.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-red-600 mt-1">
                          Reason: {disbursement.failureReason}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Retry
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 