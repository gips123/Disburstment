'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { UsersTable } from './components/UsersTable';
import { users } from './data/dummy-users';

export default function ExternalUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

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

      {/* Users Table */}
      <div className="w-full">
        <UsersTable users={users} searchTerm={searchTerm} />
      </div>
    </div>
  );
} 