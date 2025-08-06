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
  Store
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/external/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'User Management',
    href: '/external/users',
    icon: Users,
  },
  {
    title: 'Disbursements',
    href: '/external/disbursements',
    icon: FileText,
  },
  {
    title: 'Approval Queue',
    href: '/external/approvals',
    icon: CheckCircle,
  },
  {
    title: 'Balance & Top-up',
    href: '/external/balance',
    icon: CreditCard,
  },
  {
    title: 'History',
    href: '/external/history',
    icon: TrendingUp,
  },
  {
    title: 'Account Settings',
    href: '/external/settings',
    icon: Settings,
  },
];

export function ExternalSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 h-full",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Merchant Portal</span>
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
                    ? "bg-green-50 text-green-700 border-r-2 border-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Merchant Info */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Merchant ABC</p>
                <p className="text-xs text-gray-500 truncate">merchant@abc.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 