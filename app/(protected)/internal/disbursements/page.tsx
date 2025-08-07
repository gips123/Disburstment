'use client';

import { StatsCards } from './components/StatsCards';
import { DisbursementsTable } from './components/DisbursementsTable';
import { disbursements } from './data/dummy-disbursements';

export default function InternalDisbursementsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Disbursements</h1>
          <p className="text-gray-600">Monitor all disbursement transactions across merchants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards disbursements={disbursements} />

      {/* Transactions Table */}
      <DisbursementsTable disbursements={disbursements} />
    </div>
  );
}