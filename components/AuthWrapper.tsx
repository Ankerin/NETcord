'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoadingAnimation from './loading/LoadingAnimation';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
        router.replace('/');
      } else if (!isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div><LoadingAnimation/></div>;
  }

  return <>{children}</>;
}