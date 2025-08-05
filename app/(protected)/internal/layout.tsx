'use client';

import { ReactNode } from 'react';
import { useSession } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ScreenLoader } from '@/components/common/screen-loader';
import { InternalSidebar } from './components/internal-sidebar';
import { InternalHeader } from './components/internal-header';

export default function InternalLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated' && session?.user) {
      // Check if user has internal access
      const internalRoles = ['SUPERADMIN', 'MAKER', 'CHECKER'];
      if (!internalRoles.includes(session.user.role as string)) {
        // Only redirect if we haven't already checked
        if (!hasCheckedAuth) {
          router.push('/external/dashboard');
        }
      }
      setHasCheckedAuth(true);
    }
  }, [status, session, router, hasCheckedAuth]);

  if (status === 'loading') {
    return <ScreenLoader />;
  }

  if (!session?.user || !['SUPERADMIN', 'MAKER', 'CHECKER'].includes(session.user.role as string)) {
    return <ScreenLoader />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <InternalSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <InternalHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 