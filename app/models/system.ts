import { User } from './user';

// Models
export interface SystemLog {
  id: string;
  event: string;
  userId: string;
  createdAt: Date;
  entityId?: string | null;
  entityType?: string | null;
  description?: string | null;
  ipAddress?: string | null;
  user?: User;
  meta?: JSON;
}

export interface SystemSetting {
  id: string;
  name: string;
  logo?: string | null;
  active: boolean;
  address?: string | null;
  websiteURL?: string | null;
  supportEmail?: string | null;
  supportPhone?: string | null;
  language: string;
  timezone: string;
  currency: string;
  currencyFormat: string;

  socialFacebook?: string | null;
  socialTwitter?: string | null;
  socialInstagram?: string | null;
  socialLinkedIn?: string | null;
  socialPinterest?: string | null;
  socialYoutube?: string | null;

  notifyStockEmail: boolean;
  notifyStockWeb: boolean;
  notifyStockThreshold: number;
  notifyStockRoleIds: string[];

  notifyNewOrderEmail: boolean;
  notifyNewOrderWeb: boolean;
  notifyNewOrderRoleIds: string[];

  notifyOrderStatusUpdateEmail: boolean;
  notifyOrderStatusUpdateWeb: boolean;
  notifyOrderStatusUpdateRoleIds: string[];

  notifyPaymentFailureEmail: boolean;
  notifyPaymentFailureWeb: boolean;
  notifyPaymentFailureRoleIds: string[];

  notifySystemErrorFailureEmail: boolean;
  notifySystemErrorWeb: boolean;
  notifySystemErrorRoleIds: string[];
}

export interface Merchant {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  dailyLimit: number;
  monthlyLimit: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Disbursement {
  id: string;
  merchantId: string;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  amount: number;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
  makerId: string;
  checkerId?: string;
  approvedAt?: Date;
  processedAt?: Date;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Approval {
  id: string;
  type: 'MERCHANT_CREATION' | 'MERCHANT_UPDATE' | 'TOP_UP' | 'DISBURSEMENT' | 'USER_CREATION';
  entityId: string;
  entityType: 'MERCHANT' | 'DISBURSEMENT' | 'USER' | 'TOP_UP';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  makerId: string;
  checkerId?: string;
  data: any;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopUp {
  id: string;
  merchantId: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  makerId: string;
  checkerId?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BalanceLog {
  id: string;
  merchantId: string;
  type: 'TOP_UP' | 'DISBURSEMENT' | 'ADJUSTMENT';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceId: string;
  description: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
