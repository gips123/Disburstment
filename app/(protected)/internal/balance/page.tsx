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
  Clock
} from 'lucide-react';

export default function BalancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopUpForm, setShowTopUpForm] = useState(false);

  // Mock data
  const merchants = [
    {
      id: 'MCH-001',
      name: 'Merchant ABC',
      code: 'ABC001',
      balance: 50000000,
      dailyLimit: 100000000,
      monthlyLimit: 1000000000,
      status: 'ACTIVE',
      lastTopUp: '2024-01-10',
      totalTopUp: 150000000,
    },
    {
      id: 'MCH-002',
      name: 'Merchant XYZ',
      code: 'XYZ002',
      balance: 75000000,
      dailyLimit: 150000000,
      monthlyLimit: 1500000000,
      status: 'ACTIVE',
      lastTopUp: '2024-01-12',
      totalTopUp: 200000000,
    },
    {
      id: 'MCH-003',
      name: 'Merchant DEF',
      code: 'DEF003',
      balance: 25000000,
      dailyLimit: 50000000,
      monthlyLimit: 500000000,
      status: 'ACTIVE',
      lastTopUp: '2024-01-08',
      totalTopUp: 100000000,
    },
  ];

  const topUpHistory = [
    {
      id: 'TOP-001',
      merchantName: 'Merchant ABC',
      amount: 50000000,
      status: 'APPROVED',
      maker: 'John Doe',
      checker: 'Jane Smith',
      createdAt: '2024-01-15 10:30',
      approvedAt: '2024-01-15 11:00',
    },
    {
      id: 'TOP-002',
      merchantName: 'Merchant XYZ',
      amount: 75000000,
      status: 'PENDING',
      maker: 'Bob Wilson',
      checker: null,
      createdAt: '2024-01-15 09:15',
      approvedAt: null,
    },
    {
      id: 'TOP-003',
      merchantName: 'Merchant DEF',
      amount: 25000000,
      status: 'REJECTED',
      maker: 'Alice Brown',
      checker: 'Charlie Davis',
      createdAt: '2024-01-15 08:45',
      approvedAt: null,
      reason: 'Insufficient documentation',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4" />;
      case 'PENDING':
        return <Clock className="h-4 w-4" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = merchants.reduce((sum, m) => sum + m.balance, 0);
  const totalTopUp = merchants.reduce((sum, m) => sum + m.totalTopUp, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balance Management</h1>
          <p className="text-gray-600">Manage merchant balances and top-up requests</p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowTopUpForm(!showTopUpForm)}
        >
          <Plus className="h-4 w-4" />
          <span>Process Top-up</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalBalance / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Across all merchants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Top-up</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalTopUp / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              All time top-ups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {merchants.filter(m => m.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">
              With active balances
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Top-ups</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {topUpHistory.filter(t => t.status === 'PENDING').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top-up Form */}
      {showTopUpForm && (
        <Card>
          <CardHeader>
            <CardTitle>Process Top-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="merchant">Select Merchant</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Choose merchant</option>
                    {merchants.map(merchant => (
                      <option key={merchant.id} value={merchant.id}>
                        {merchant.name} - Rp {merchant.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Input id="reason" placeholder="Enter reason for top-up" />
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
                  <Button className="flex-1">Submit for Approval</Button>
                  <Button variant="outline" onClick={() => setShowTopUpForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium">Code</th>
                  <th className="text-left py-3 px-4 font-medium">Current Balance</th>
                  <th className="text-left py-3 px-4 font-medium">Limits</th>
                  <th className="text-left py-3 px-4 font-medium">Last Top-up</th>
                  <th className="text-left py-3 px-4 font-medium">Total Top-up</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">{merchant.name}</div>
                        <div className="text-sm text-gray-600">ID: {merchant.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{merchant.code}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-green-600">
                        Rp {merchant.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div>Daily: Rp {(merchant.dailyLimit / 1000000).toFixed(0)}M</div>
                        <div>Monthly: Rp {(merchant.monthlyLimit / 1000000).toFixed(0)}M</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {merchant.lastTopUp}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        Rp {merchant.totalTopUp.toLocaleString()}
                      </div>
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

      {/* Top-up History */}
      <Card>
        <CardHeader>
          <CardTitle>Top-up History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topUpHistory.map((topUp) => (
              <div key={topUp.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(topUp.status)}`}>
                      {getStatusIcon(topUp.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{topUp.merchantName}</h3>
                        <Badge className={getStatusColor(topUp.status)}>
                          {topUp.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Top-up: Rp {topUp.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Maker: {topUp.maker}</span>
                        {topUp.checker && <span>Checker: {topUp.checker}</span>}
                        <span>Created: {topUp.createdAt}</span>
                      </div>
                      {topUp.reason && (
                        <p className="text-xs text-red-600 mt-1">
                          Reason: {topUp.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {topUp.status === 'PENDING' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 