export const approvals = [
  {
    id: 'APV-001',
    type: 'DISBURSEMENT',
    entityName: 'John Doe',
    description: 'Disbursement to John Doe - Rp 5,000,000',
    maker: 'Alice Brown',
    createdAt: '2024-01-15 10:30',
    status: 'PENDING',
    data: {
      recipientName: 'John Doe',
      recipientAccount: '1234567890',
      recipientBank: 'BCA',
      amount: 5000000,
      description: 'Salary payment',
    }
  },
  {
    id: 'APV-002',
    type: 'USER_CREATION',
    entityName: 'New User Registration',
    description: 'New user registration for Bob Wilson',
    maker: 'Charlie Davis',
    createdAt: '2024-01-15 09:15',
    status: 'PENDING',
    data: {
      name: 'Bob Wilson',
      email: 'bob@company.com',
      phone: '+62 812-3456-7890',
      role: 'MAKER',
    }
  },
  {
    id: 'APV-003',
    type: 'DISBURSEMENT',
    entityName: 'Jane Smith',
    description: 'Disbursement to Jane Smith - Rp 2,500,000',
    maker: 'David Wilson',
    createdAt: '2024-01-15 08:45',
    status: 'APPROVED',
    data: {
      recipientName: 'Jane Smith',
      recipientAccount: '0987654321',
      recipientBank: 'Mandiri',
      amount: 2500000,
      description: 'Bonus payment',
    }
  },
  {
    id: 'APV-004',
    type: 'USER_CREATION',
    entityName: 'User Registration',
    description: 'New user registration for Eve Johnson',
    maker: 'Frank Miller',
    createdAt: '2024-01-15 08:30',
    status: 'REJECTED',
    data: {
      name: 'Eve Johnson',
      email: 'eve@company.com',
      phone: '+62 813-9876-5432',
      role: 'CHECKER',
    }
  },
];