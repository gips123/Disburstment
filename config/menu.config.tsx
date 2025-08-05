import {
  AlertCircle,
  Captions,
  CircleDollarSign,
  Coffee,
  File as DocumentIcon,
  FileQuestion,
  Files,
  HelpCircle,
  LayoutGrid,
  Users as PeopleIcon,
  Settings,
  Share2,
  Shield,
  ShieldUser,
  ShoppingCart,
  Star,
  Store,
  UserCircle,
  Users,
  Briefcase as WorkIcon,
} from 'lucide-react';
import { type MenuConfig } from './types';

export const MENU_BREADCRUMB: MenuConfig = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    path: '/',
  },
  {
    title: 'User',
    icon: UserCircle,
    children: [
      {
        title: 'Manage User',
        path: '/user/manage-user',
      },
      {
        title: 'Add User',
        path: '/user/add-user',
      },
    ],
  },

  {
    title: 'Merchants',
    icon: Store,
    children: [
      {
        title: 'Manage Merchant',
      },
    ],
  },

  {
    title: 'Report',
    icon: Files,
    children: [
      {
        title: 'Account Statement',
      },
    ],
  },
  {
    title: 'Send Money',
    icon: CircleDollarSign,
    children: [
      {
        title: 'Transfer',
        path: '/send-money/transfer',
        children: [
          {
            title: 'Draft',
            path: '/send-money/transfer/draft',
          },
          {
            title: 'Pending Approval',
            path: '/send-money/transfer/pending-approval',
          },
          {
            title: 'Approval Log',
            path: '/send-money/transfer/approval-log',
          },
        ],
      },
    ],
  },
];
export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    path: '/',
  },
  {
    title: 'User',
    icon: UserCircle,
    children: [
      {
        title: 'Manage User',
        path: '/user/manage-user',
      },
    ],
  },

  {
    title: 'Merchants',
    icon: Store,
    children: [
      {
        title: 'Manage Merchant',
      },
    ],
  },

  {
    title: 'Report',
    icon: Files,
    children: [
      {
        title: 'Account Statement',
      },
    ],
  },
  {
    title: 'Send Money',
    icon: CircleDollarSign,
    children: [
      {
        title: 'Transfer',
        path: '/send-money/transfer/draft',
      },
    ],
  },
];

export const MENU_HELP: MenuConfig = [
  {
    title: 'Getting Started',
    icon: Coffee,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation',
  },
  {
    title: 'Support Forum',
    icon: AlertCircle,
    children: [
      {
        title: 'All Questions',
        icon: FileQuestion,
        path: 'https://devs.keenthemes.com',
      },
      {
        title: 'Popular Questions',
        icon: Star,
        path: 'https://devs.keenthemes.com/popular',
      },
      {
        title: 'Ask Question',
        icon: HelpCircle,
        path: 'https://devs.keenthemes.com/question/create',
      },
    ],
  },
  {
    title: 'Licenses & FAQ',
    icon: Captions,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license',
  },
  {
    title: 'Documentation',
    icon: FileQuestion,
    path: 'https://keenthemes.com/metronic/tailwind/docs',
  },
  { separator: true },
  { title: 'Contact Us', icon: Share2, path: 'https://keenthemes.com/contact' },
];

export const MENU_ROOT: MenuConfig = [
  {
    title: 'Public Profile',
    icon: UserCircle,
    rootPath: '/public-profile/',
    path: '/public-profile/profiles/default',
    childrenIndex: 2,
  },
  {
    title: 'Account',
    icon: Settings,
    rootPath: '/account/',
    path: '/',
    childrenIndex: 3,
  },
  {
    title: 'Network',
    icon: Users,
    rootPath: '/network/',
    path: '/network/get-started',
    childrenIndex: 4,
  },
  {
    title: 'Authentication',
    icon: Shield,
    rootPath: '/authentication/',
    path: '/authentication/get-started',
    childrenIndex: 5,
  },
  {
    title: 'Store - Client',
    icon: ShoppingCart,
    rootPath: '/store-client/',
    path: '/store-client/home',
    childrenIndex: 6,
  },
  {
    title: 'User Management',
    icon: ShieldUser,
    rootPath: '/user-management/',
    path: '/user-management/users',
    childrenIndex: 7,
  },
];
