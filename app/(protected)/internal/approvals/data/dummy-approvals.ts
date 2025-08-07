export const approvals = [
  {
    id: 'APV-001',
    type: 'MERCHANT_CREATION',
    entityName: 'Merchant ABC',
    description: 'New merchant registration',
    maker: 'Budi',
    createdAt: '2024-01-15 10:30',
    status: 'PENDING',
    data: {
      name: 'Merchant ABC',
      email: 'contact@merchantabc.com',
      phone: '+62 812-3456-7890',
      address: 'Jakarta, Indonesia',
    }
  },
  {
    id: 'APV-002',
    type: 'TOP_UP',
    entityName: 'Merchant XYZ',
    description: 'Top-up request for Rp 50,000,000',
    maker: 'Sela',
    createdAt: '2024-01-15 09:15',
    status: 'PENDING',
    data: {
      amount: 50000000,
      merchantId: 'MCH-002',
      reason: 'Monthly top-up',
    }
  },
  {
    id: 'APV-003',
    type: 'DISBURSEMENT',
    entityName: 'Transaction TRX-001',
    description: 'Disbursement to Budi - Rp 5,000,000',
    maker: 'Fery',
    createdAt: '2024-01-15 08:45',
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
    id: 'APV-004',
    type: 'USER_CREATION',
    entityName: 'User Registration',
    description: 'New user registration for Merchant DEF',
    maker: 'Gracia',
    createdAt: '2024-01-15 08:30',
    status: 'APPROVED',
    data: {
      name: 'New User',
      email: 'user@merchantdef.com',
      role: 'MAKER',
    }
  },
];