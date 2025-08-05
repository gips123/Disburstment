'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Shield,
  Building2
} from 'lucide-react';

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const merchants = [
    {
      id: 'MCH-001',
      name: 'Merchant ABC',
      code: 'ABC001',
      email: 'contact@merchantabc.com',
      phone: '+62 812-3456-7890',
      balance: 50000000,
      status: 'ACTIVE',
      createdAt: '2024-01-15',
      dailyLimit: 100000000,
      monthlyLimit: 1000000000,
    },
    {
      id: 'MCH-002',
      name: 'Merchant XYZ',
      code: 'XYZ002',
      email: 'info@merchantxyz.com',
      phone: '+62 813-9876-5432',
      balance: 75000000,
      status: 'ACTIVE',
      createdAt: '2024-01-20',
      dailyLimit: 150000000,
      monthlyLimit: 1500000000,
    },
    {
      id: 'MCH-003',
      name: 'Merchant DEF',
      code: 'DEF003',
      email: 'hello@merchantdef.com',
      phone: '+62 814-1111-2222',
      balance: 25000000,
      status: 'SUSPENDED',
      createdAt: '2024-02-01',
      dailyLimit: 50000000,
      monthlyLimit: 500000000,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Merchant Management</h1>
          <p className="text-gray-600">Manage all registered merchants</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Merchant</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{merchants.length}</div>
            <p className="text-xs text-muted-foreground">
              {merchants.filter(m => m.status === 'ACTIVE').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(merchants.reduce((sum, m) => sum + m.balance, 0) / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Across all merchants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {merchants.filter(m => m.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {merchants.filter(m => m.status === 'SUSPENDED').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Temporarily disabled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Merchants</CardTitle>
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
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Balance</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Limits</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
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
                      <div>
                        <div className="text-sm">{merchant.email}</div>
                        <div className="text-sm text-gray-600">{merchant.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        Rp {merchant.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(merchant.status)}>
                        {merchant.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div>Daily: Rp {(merchant.dailyLimit / 1000000).toFixed(0)}M</div>
                        <div>Monthly: Rp {(merchant.monthlyLimit / 1000000).toFixed(0)}M</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {merchant.createdAt}
                    </td>
                    <td className="py-4 px-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 