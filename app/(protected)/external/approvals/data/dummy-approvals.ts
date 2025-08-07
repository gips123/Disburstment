export const approvals = [
  {
    id: 'APV-001',
    type: 'DISBURSEMENT',
    entityName: 'Budi',
    description: 'Disbursement to Budi - Rp 5,000,000',
    maker: 'Gracia',
    createdAt: '2024-01-15 10:30',
    status: 'PENDING',
    data: {
      recipientName: 'Budi',
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
    description: 'New user registration for Fery',
    maker: 'Charlie Davis',
    createdAt: '2024-01-15 09:15',
    status: 'PENDING',
    data: {
      name: 'Fery',
      email: 'bob@company.com',
      phone: '+62 812-3456-7890',
      role: 'MAKER',
    }
  },
  {
    id: 'APV-003',
    type: 'DISBURSEMENT',
    entityName: 'Sela',
    description: 'Disbursement to Sela - Rp 2,500,000',
    maker: 'David Wilson',
    createdAt: '2024-01-15 08:45',
    status: 'APPROVED',
    data: {
      recipientName: 'Sela',
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
    description: 'New user registration for Jimmy',
    maker: 'Frank Miller',
    createdAt: '2024-01-15 08:30',
    status: 'REJECTED',
    data: {
      name: 'Jimmy',
      email: 'eve@company.com',
      phone: '+62 813-9876-5432',
      role: 'CHECKER',
    }
  },
];