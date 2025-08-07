'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { UsersTable } from './components/UsersTable';
import { users } from './data/dummy-users';
import { useState } from 'react';

export default function UserManagementPage() {
  const [showUserForm, setShowUserForm] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and their roles</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setShowUserForm(!showUserForm)}>
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards users={users} />

      {/* Users Table */}
      <UsersTable users={users} />
    </div>
  );
}