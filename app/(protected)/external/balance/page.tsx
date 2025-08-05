'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from 'lucide-react';

export default function ExternalBalancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopUpForm, setShowTopUpForm] = useState(false);

  // Mock data
  const balanceInfo = {
    currentBalance: 50000000,
    dailyLimit: 100000000,
    monthlyLimit: 1000000000,
    usedToday: 15000000,
    usedThisMonth: 150000000,
    lastTopUp: '2024-01-10',
    totalTopUp: 200000000,
  };

  const topUpHistory = [
    {
      id: 'TOP-001',
      amount: 50000000,
      status: 'APPROVED',
      maker: 'John Doe',
      checker: 'Jane Smith',
      createdAt: '2024-01-15 10:30',
      approvedAt: '2024-01-15 11:00',
      reason: 'Monthly top-up',
    },
    {
      id: 'TOP-002',
      amount: 75000000,
      status: 'PENDING',
      maker: 'Bob Wilson',
      checker: null,
      createdAt: '2024-01-15 09:15',
      approvedAt: null,
      reason: 'Emergency top-up',
    },
    {
      id: 'TOP-003',
      amount: 25000000,
      status: 'REJECTED',
      maker: 'Alice Brown',
      checker: 'Charlie Davis',
      createdAt: '2024-01-15 08:45',
      approvedAt: null,
      reason: 'Insufficient documentation',
    },
  ];

  const expenseHistory = [
    {
      id: 'EXP-001',
      type: 'DISBURSEMENT',
      description: 'Salary payment to John Doe',
      amount: 5000000,
      status: 'SUCCESS',
      createdAt: '2024-01-15 10:30',
    },
    {
      id: 'EXP-002',
      type: 'DISBURSEMENT',
      description: 'Bonus payment to Jane Smith',
      amount: 2500000,
      status: 'SUCCESS',
      createdAt: '2024-01-15 09:15',
    },
    {
      id: 'EXP-003',
      type: 'DISBURSEMENT',
      description: 'Commission payment to Bob Wilson',
      amount: 10000000,
      status: 'FAILED',
      createdAt: '2024-01-15 08:45',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="h-4 w-4" />;
      case 'PENDING': return <Clock className="h-4 w-4" />;
      case 'REJECTED': return <XCircle className="h-4 w-4" />;
      case 'SUCCESS': return <CheckCircle className="h-4 w-4" />;
      case 'FAILED': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTopUpHistory = topUpHistory.filter(history =>
    history.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balance & Top-up</h1>
          <p className="text-gray-600">Manage your merchant balance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export History</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => setShowTopUpForm(!showTopUpForm)}
          >
            <Plus className="h-4 w-4" />
            <span>Request Top-up</span>
          </Button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Rp {balanceInfo.currentBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for disbursement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Limit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {balanceInfo.dailyLimit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Used: Rp {balanceInfo.usedToday.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {balanceInfo.monthlyLimit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Used: Rp {balanceInfo.usedThisMonth.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Top-up</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {balanceInfo.totalTopUp.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All time top-ups
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top-up Request Form */}
      {showTopUpForm && (
        <Card>
          <CardHeader>
            <CardTitle>Request Top-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Input id="reason" placeholder="Enter reason for top-up" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select priority</option>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select payment method</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                    <option value="adjustment">Balance Adjustment</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input id="reference" placeholder="Enter reference number" />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">Submit Request</Button>
                  <Button variant="outline" onClick={() => setShowTopUpForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top-up History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Reason</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Maker</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTopUpHistory.map((history) => (
                  <tr key={history.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium">{history.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        Rp {history.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">{history.reason}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(history.status)}
                        <Badge className={getStatusColor(history.status)}>
                          {history.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">{history.maker}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {history.createdAt}
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

      {/* Expense History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseHistory.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(expense.status)}
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">{expense.id}</p>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">
                    - Rp {expense.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{expense.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 