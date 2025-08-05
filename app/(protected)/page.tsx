'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/providers/auth-provider';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated' && session?.user && !hasRedirected) {
      // Redirect based on user role
      const internalRoles = ['SUPERADMIN', 'MAKER', 'CHECKER'];
      const externalRoles = ['MERCHANT_MAKER', 'MERCHANT_CHECKER', 'MERCHANT_VIEWER'];
      
      if (internalRoles.includes(session.user.role as string)) {
        router.push('/internal/dashboard');
      } else if (externalRoles.includes(session.user.role as string)) {
        router.push('/external/dashboard');
      } else {
        // Default to internal for unknown roles
        router.push('/internal/dashboard');
      }
      setHasRedirected(true);
    }
  }, [status, session, router, hasRedirected]);

  if (status === 'loading') {
    return <ScreenLoader />;
  }

  return <ScreenLoader />;
}
