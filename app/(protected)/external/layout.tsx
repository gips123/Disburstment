'use client';

import { ReactNode } from 'react';
import { useSession } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ScreenLoader } from '@/components/common/screen-loader';
import { ExternalSidebar } from './components/external-sidebar';
import { ExternalHeader } from './components/external-header';

export default function ExternalLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated' && session?.user) {
      // Check if user has external access (merchant role)
      const externalRoles = ['MERCHANT_MAKER', 'MERCHANT_CHECKER', 'MERCHANT_VIEWER'];
      if (!externalRoles.includes(session.user.role as string)) {
        // Only redirect if we haven't already checked
        if (!hasCheckedAuth) {
          router.push('/internal/dashboard');
        }
      }
      setHasCheckedAuth(true);
    }
  }, [status, session, router, hasCheckedAuth]);

  if (status === 'loading') {
    return <ScreenLoader />;
  }

  if (!session?.user || !['MERCHANT_MAKER', 'MERCHANT_CHECKER', 'MERCHANT_VIEWER'].includes(session.user.role as string)) {
    return <ScreenLoader />;
  }

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      <ExternalSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <ExternalHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
} 