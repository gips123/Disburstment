export interface Disbursement {
  id: string;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  processedAt?: string;
  type: string;
  recipientId: string;
  failureReason?: string;
}

export interface AutomaticDisbursement {
  id: string;
  name: string;
  description: string;
  schedule: string;
  nextRun: string;
  totalRecipients: number;
  totalAmount: number;
  status: string;
  lastRun: string;
}

export const disbursements: Disbursement[] = [
  {
    id: 'TRX-001',
    recipientName: 'Budi',
    recipientAccount: '1234567890',
    recipientBank: 'BCA',
    amount: 5000000,
    description: 'Salary payment - January 2024',
    status: 'SUCCESS',
    createdAt: '2024-01-15 10:30',
    processedAt: '2024-01-15 10:35',
    type: 'SALARY',
    recipientId: 'USR-001',
  },
  {
    id: 'TRX-002',
    recipientName: 'Sela',
    recipientAccount: '0987654321',
    recipientBank: 'Mandiri',
    amount: 3500000,
    description: 'Contractor payment - Project A',
    status: 'PENDING',
    createdAt: '2024-01-15 09:15',
    processedAt: '',
    type: 'CONTRACTOR',
    recipientId: 'USR-002',
  },
  {
    id: 'TRX-003',
    recipientName: 'Fery',
    recipientAccount: '1122334455',
    recipientBank: 'BNI',
    amount: 2000000,
    description: 'Vendor payment - Marketing services',
    status: 'FAILED',
    createdAt: '2024-01-15 08:45',
    processedAt: '',
    failureReason: 'Invalid account number',
    type: 'VENDOR',
    recipientId: 'USR-003',
  },
];

export const automaticDisbursements: AutomaticDisbursement[] = [
  {
    id: 'AUTO-001',
    name: 'Monthly Salary',
    description: 'Automatic salary disbursement for all employees',
    schedule: 'MONTHLY',
    nextRun: '2024-02-01',
    totalRecipients: 25,
    totalAmount: 125000000,
    status: 'ACTIVE',
    lastRun: '2024-01-01',
  },
  {
    id: 'AUTO-002',
    name: 'Contractor Payments',
    description: 'Bi-weekly payments for contractors',
    schedule: 'BI_WEEKLY',
    nextRun: '2024-01-22',
    totalRecipients: 8,
    totalAmount: 28000000,
    status: 'ACTIVE',
    lastRun: '2024-01-08',
  },
  {
    id: 'AUTO-003',
    name: 'Vendor Payments',
    description: 'Monthly vendor payments',
    schedule: 'MONTHLY',
    nextRun: '2024-02-01',
    totalRecipients: 12,
    totalAmount: 45000000,
    status: 'INACTIVE',
    lastRun: '2024-01-01',
  },
]; 