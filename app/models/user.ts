// Simple user types for UI display only
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'MAKER' | 'CHECKER' | 'SUPERADMIN' | 'VIEWER' | 'MERCHANT_MAKER' | 'MERCHANT_CHECKER' | 'MERCHANT_VIEWER';
  merchantId?: string; // For merchant users
  isActive: boolean;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mock data for development
export const MOCK_USER: User = {
  id: '1',
  email: 'demo@kt.com',
  name: 'Demo User',
  role: 'SUPERADMIN',
  isActive: true,
  avatar: '/media/avatars/300-2.png',
};
