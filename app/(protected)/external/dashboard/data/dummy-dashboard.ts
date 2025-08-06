export const stats = {
  currentBalance: 50000000,
  totalUsers: 25,
  activeUsers: 22,
  todayTransactions: 12,
  pendingApprovals: 3,
  failedTransactions: 1,
  dailyLimit: 100000000,
  monthlyLimit: 1000000000,
};

export const recentTransactions = [
  {
    id: 'TRX-001',
    recipient: 'John Doe',
    amount: 5000000,
    status: 'SUCCESS',
    time: '2 min ago',
  },
  {
    id: 'TRX-002',
    recipient: 'Jane Smith',
    amount: 2500000,
    status: 'PENDING',
    time: '5 min ago',
  },
  {
    id: 'TRX-003',
    recipient: 'Bob Wilson',
    amount: 10000000,
    status: 'FAILED',
    time: '10 min ago',
  },
];