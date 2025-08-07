'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { MerchantsTable } from './components/MerchantsTable';
import { merchants } from './data/dummy-merchants';

export default function MerchantsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Merchant</h1>
          <p className="text-gray-600">Kelola semua merchant yang terdaftar</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Tambah Merchant Baru</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards merchants={merchants} />

      {/* Table with Filters */}
      <MerchantsTable merchants={merchants} />
    </div>
  );
}