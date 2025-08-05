'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  CheckCircle, 
  Settings,
  Building2,
  TrendingUp,
  Activity,
  Shield
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/internal/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Merchant Management',
    href: '/internal/merchants',
    icon: Building2,
  },
  {
    title: 'Balance Management',
    href: '/internal/balance',
    icon: CreditCard,
  },
  {
    title: 'Disbursements',
    href: '/internal/disbursements',
    icon: FileText,
  },
  {
    title: 'Approval Queue',
    href: '/internal/approvals',
    icon: CheckCircle,
  },
  {
    title: 'User Management',
    href: '/internal/users',
    icon: Users,
  },
  {
    title: 'Reports',
    href: '/internal/reports',
    icon: TrendingUp,
  },
  {
    title: 'Activity Logs',
    href: '/internal/logs',
    icon: Activity,
  },
  {
    title: 'Settings',
    href: '/internal/settings',
    icon: Settings,
  },
];

export function InternalSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Disbursement</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 