'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Download, X } from 'lucide-react';
import { UsersTable } from './components/UsersTable';
import { users } from './data/dummy-users';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  bankAccount: string;
  bankName: string;
  monthlySalary: number;
  lastDisbursement: string;
  totalDisbursed: number;
  location: string;
  department: string;
  createdAt: string;
}

export default function ExternalUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('latest');

  const statusCounts = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        const status = user.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [users]);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage your merchant users</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Users</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card>
        <CardContent className="p-4 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Cari pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 w-full md:w-40"
            />
            {searchQuery.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Status
                {selectedStatuses.length > 0 && (
                  <Badge size="sm" variant="outline">
                    {selectedStatuses.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-3" align="start">
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground">
                  Filter Status
                </div>
                <div className="space-y-3">
                  {Object.keys(statusCounts).map((status) => (
                    <div key={status} className="flex items-center gap-2.5">
                      <Checkbox
                        id={status}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) =>
                          handleStatusChange(checked === true, status)
                        }
                      />
                      <Label
                        htmlFor={status}
                        className="grow flex items-center justify-between font-normal gap-1.5"
                      >
                        {status}
                        <span className="text-muted-foreground">
                          {statusCounts[status]}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Urutan
                {sortOrder !== 'latest' && (
                  <Badge size="sm" variant="outline">
                    {sortOrder === 'oldest' ? 'Terlama' : 'Terbaru'}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-3" align="start">
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground">
                  Urut Berdasarkan
                </div>
                <div className="space-y-3">
                  {['latest', 'oldest'].map((order) => (
                    <div key={order} className="flex items-center gap-2.5">
                      <Checkbox
                        id={order}
                        checked={sortOrder === order}
                        onCheckedChange={(checked) =>
                          checked && setSortOrder(order)
                        }
                      />
                      <Label
                        htmlFor={order}
                        className="grow flex items-center justify-between font-normal gap-1.5"
                      >
                        {order === 'latest' ? 'Terbaru' : 'Terlama'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Users Table */}
      <UsersTable users={users} searchQuery={searchQuery} selectedStatuses={selectedStatuses} sortOrder={sortOrder} />
    </div>
  );
}