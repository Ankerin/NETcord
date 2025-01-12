import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        await api.get('/api/auth/check');
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        logout();
      }
    }
    setIsLoading(false);
  };

  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  const refreshToken = async () => {
    try {
      const response = await api.post('/api/refresh-token');
      const { token: newToken } = response.data;
      login(newToken);
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  };

  const redirectIfAuthenticated = (paths: string[]) => {
    if (isAuthenticated && typeof window !== 'undefined') {
      const currentPathname = window.location.pathname;
      if (paths.includes(currentPathname)) {
        router.push('/channels');
      }
    }
  };

  return { token, isLoading, isAuthenticated, login, logout, refreshToken, requireAuth, redirectIfAuthenticated };
}