'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Users,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Settings,
  CheckSquare,
  Square
} from 'lucide-react';

export default function ExternalUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for disbursement recipients
  const users = [
    {
      id: 'USR-001',
      name: 'John Doe',
      email: 'john@company.com',
      phone: '+62 812-3456-7890',
      role: 'EMPLOYEE',
      status: 'ACTIVE',
      bankAccount: '1234567890',
      bankName: 'BCA',
      monthlySalary: 5000000,
      lastDisbursement: '2024-01-15',
      totalDisbursed: 15000000,
      location: 'Jakarta',
      department: 'Engineering',
      createdAt: '2024-01-10',
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+62 813-9876-5432',
      role: 'CONTRACTOR',
      status: 'ACTIVE',
      bankAccount: '0987654321',
      bankName: 'Mandiri',
      monthlySalary: 3500000,
      lastDisbursement: '2024-01-15',
      totalDisbursed: 10500000,
      location: 'Bandung',
      department: 'Design',
      createdAt: '2024-01-08',
    },
    {
      id: 'USR-003',
      name: 'Bob Wilson',
      email: 'bob@company.com',
      phone: '+62 814-1111-2222',
      role: 'VENDOR',
      status: 'INACTIVE',
      bankAccount: '1122334455',
      bankName: 'BNI',
      monthlySalary: 2000000,
      lastDisbursement: '2024-01-10',
      totalDisbursed: 6000000,
      location: 'Surabaya',
      department: 'Marketing',
      createdAt: '2024-01-05',
    },
    {
      id: 'USR-004',
      name: 'Alice Brown',
      email: 'alice@company.com',
      phone: '+62 815-3333-4444',
      role: 'EMPLOYEE',
      status: 'ACTIVE',
      bankAccount: '5566778899',
      bankName: 'BRI',
      monthlySalary: 4500000,
      lastDisbursement: '2024-01-15',
      totalDisbursed: 13500000,
      location: 'Medan',
      department: 'Sales',
      createdAt: '2024-01-03',
    },
    {
      id: 'USR-005',
      name: 'Charlie Davis',
      email: 'charlie@company.com',
      phone: '+62 816-5555-6666',
      role: 'PARTNER',
      status: 'ACTIVE',
      bankAccount: '9988776655',
      bankName: 'CIMB Niaga',
      monthlySalary: 3000000,
      lastDisbursement: '2024-01-12',
      totalDisbursed: 9000000,
      location: 'Semarang',
      department: 'Finance',
      createdAt: '2024-01-02',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'EMPLOYEE': return 'bg-blue-100 text-blue-800';
      case 'CONTRACTOR': return 'bg-green-100 text-green-800';
      case 'VENDOR': return 'bg-purple-100 text-purple-800';
      case 'PARTNER': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-red-100 text-red-800';
      case 'SUSPENDED': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
      case 'INACTIVE': return <XCircle className="h-4 w-4" />;
      case 'SUSPENDED': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
  });

  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const totalSalary = users.reduce((sum, u) => sum + u.monthlySalary, 0);
  const totalDisbursed = users.reduce((sum, u) => sum + u.totalDisbursed, 0);

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`${action} for users:`, selectedUsers);
    // Here you would implement the actual bulk action
    alert(`${action} for ${selectedUsers.length} selected users`);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Role,Status,Department,Monthly Salary,Bank Account,Bank Name\n"
      + filteredUsers.map(user => 
        `${user.name},${user.email},${user.role},${user.status},${user.department},${user.monthlySalary},${user.bankAccount},${user.bankName}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recipients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          console.log('Imported CSV:', text);
          alert('CSV imported successfully!');
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Recipients</h1>
          <p className="text-gray-600">Manage employees, contractors, and vendors for disbursement</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={handleImport}>
            <Upload className="h-4 w-4" />
            <span>Import CSV</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-4 w-4" />
            <span>Add Recipient</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} active recipients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalSalary / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Total monthly disbursement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Rp {(totalDisbursed / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              All time disbursements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Engineering, Design, Marketing, Sales, Finance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Recipient Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Recipient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Role Type</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select role</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="VENDOR">Vendor</option>
                    <option value="PARTNER">Partner</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="salary">Monthly Salary</Label>
                  <Input id="salary" type="number" placeholder="Enter monthly salary" />
                </div>
                <div>
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input id="bankAccount" placeholder="Enter bank account number" />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
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

      {/* Recipients List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recipients List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search recipients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
                <div>
                  <Label>Role</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="VENDOR">Vendor</option>
                    <option value="PARTNER">Partner</option>
                  </select>
                </div>
                <div>
                  <Label>Department</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    <button onClick={handleSelectAll} className="flex items-center">
                      {selectedUsers.length === filteredUsers.length ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Member</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Salary</th>
                  <th className="text-left py-3 px-4 font-medium">Last Disbursement</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <button onClick={() => handleSelectUser(user.id)}>
                        {selectedUsers.includes(user.id) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(user.status)}
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        Rp {user.monthlySalary.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Monthly</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {user.lastDisbursement}
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

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Actions ({selectedUsers.length} selected)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => handleBulkAction('Schedule Disbursement')}
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Disbursement</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => handleBulkAction('Process Salary')}
              >
                <DollarSign className="h-4 w-4" />
                <span>Process Salary</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => handleBulkAction('Export Selected')}
              >
                <Download className="h-4 w-4" />
                <span>Export Selected</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => handleBulkAction('Update via CSV')}
              >
                <Upload className="h-4 w-4" />
                <span>Update via CSV</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2 text-red-600"
                onClick={() => handleBulkAction('Delete Selected')}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 