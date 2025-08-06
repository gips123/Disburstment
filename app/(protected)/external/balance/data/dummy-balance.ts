export const balanceInfo = {
  currentBalance: 50000000,
  dailyLimit: 100000000,
  monthlyLimit: 1000000000,
  usedToday: 15000000,
  usedThisMonth: 150000000,
  lastTopUp: '2024-01-10',
  totalTopUp: 200000000,
};

export const topUpHistory = [
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

export const expenseHistory = [
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