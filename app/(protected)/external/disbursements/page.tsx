'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  Download,
  Calendar,
  Users,
  Settings,
  Repeat
} from 'lucide-react';

export default function DisbursementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');

  // Mock data
  const disbursements = [
    {
      id: 'TRX-001',
      recipientName: 'John Doe',
      recipientAccount: '1234567890',
      recipientBank: 'BCA',
      amount: 5000000,
      description: 'Salary payment - January 2024',
      status: 'SUCCESS',
      createdAt: '2024-01-15 10:30',
      processedAt: '2024-01-15 10:35',
      type: 'SALARY',
      recipientId: 'USR-001',
    },
    {
      id: 'TRX-002',
      recipientName: 'Jane Smith',
      recipientAccount: '0987654321',
      recipientBank: 'Mandiri',
      amount: 3500000,
      description: 'Contractor payment - Project A',
      status: 'PENDING',
      createdAt: '2024-01-15 09:15',
      processedAt: null,
      type: 'CONTRACTOR',
      recipientId: 'USR-002',
    },
    {
      id: 'TRX-003',
      recipientName: 'Bob Wilson',
      recipientAccount: '1122334455',
      recipientBank: 'BNI',
      amount: 2000000,
      description: 'Vendor payment - Marketing services',
      status: 'FAILED',
      createdAt: '2024-01-15 08:45',
      processedAt: null,
      failureReason: 'Invalid account number',
      type: 'VENDOR',
      recipientId: 'USR-003',
    },
  ];

  const automaticDisbursements = [
    {
      id: 'AUTO-001',
      name: 'Monthly Salary',
      description: 'Automatic salary disbursement for all employees',
      schedule: 'MONTHLY',
      nextRun: '2024-02-01',
      totalRecipients: 25,
      totalAmount: 125000000,
      status: 'ACTIVE',
      lastRun: '2024-01-01',
    },
    {
      id: 'AUTO-002',
      name: 'Contractor Payments',
      description: 'Bi-weekly payments for contractors',
      schedule: 'BI_WEEKLY',
      nextRun: '2024-01-22',
      totalRecipients: 8,
      totalAmount: 28000000,
      status: 'ACTIVE',
      lastRun: '2024-01-08',
    },
    {
      id: 'AUTO-003',
      name: 'Vendor Payments',
      description: 'Monthly vendor payments',
      schedule: 'MONTHLY',
      nextRun: '2024-02-01',
      totalRecipients: 12,
      totalAmount: 45000000,
      status: 'INACTIVE',
      lastRun: '2024-01-01',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle className="h-4 w-4" />;
      case 'PENDING': return <Clock className="h-4 w-4" />;
      case 'FAILED': return <XCircle className="h-4 w-4" />;
      case 'PROCESSING': return <Clock className="h-4 w-4" />;
      case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
      case 'INACTIVE': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SALARY': return 'bg-blue-100 text-blue-800';
      case 'CONTRACTOR': return 'bg-green-100 text-green-800';
      case 'VENDOR': return 'bg-purple-100 text-purple-800';
      case 'BONUS': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDisbursements = disbursements.filter(disbursement =>
    disbursement.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.recipientBank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = disbursements.reduce((sum, d) => sum + d.amount, 0);
  const successCount = disbursements.filter(d => d.status === 'SUCCESS').length;
  const pendingCount = disbursements.filter(d => d.status === 'PENDING').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disbursements</h1>
          <p className="text-gray-600">Manage manual and automatic disbursements</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Bulk Upload</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-4 w-4" />
            <span>New Disbursement</span>
          </Button>
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
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Manual and Automatic Disbursements */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Disbursements</TabsTrigger>
          <TabsTrigger value="automatic">Automatic Disbursements</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          {/* New Disbursement Form */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>New Disbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Select Recipient</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Choose recipient</option>
                        <option value="USR-001">John Doe - Employee</option>
                        <option value="USR-002">Jane Smith - Contractor</option>
                        <option value="USR-003">Bob Wilson - Vendor</option>
                        <option value="USR-004">Alice Brown - Employee</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" />
                    </div>
                    <div>
                      <Label htmlFor="type">Disbursement Type</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select type</option>
                        <option value="SALARY">Salary</option>
                        <option value="BONUS">Bonus</option>
                        <option value="CONTRACTOR">Contractor Payment</option>
                        <option value="VENDOR">Vendor Payment</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter description" />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule (Optional)</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">One-time payment</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="BI_WEEKLY">Bi-weekly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1">Submit for Approval</Button>
                      <Button variant="outline" onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
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
                      <th className="text-left py-3 px-4 font-medium">Recipient</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Bank</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
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
                          <div>
                            <div className="font-medium">{disbursement.recipientName}</div>
                            <div className="text-sm text-gray-600">{disbursement.recipientAccount}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getTypeColor(disbursement.type)}>
                            {disbursement.type}
                          </Badge>
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
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {disbursement.createdAt}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {disbursement.status === 'PENDING' && (
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
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
        </TabsContent>

        <TabsContent value="automatic" className="space-y-6">
          {/* Automatic Disbursements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Automatic Disbursements</CardTitle>
                <Button className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Configure Auto-Disbursement</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automaticDisbursements.map((auto) => (
                  <div key={auto.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(auto.status)}`}>
                          <Repeat className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{auto.name}</h3>
                            <Badge className={getStatusColor(auto.status)}>
                              {auto.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{auto.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Schedule: {auto.schedule}</span>
                            <span>Next Run: {auto.nextRun}</span>
                            <span>Recipients: {auto.totalRecipients}</span>
                            <span>Amount: Rp {auto.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 