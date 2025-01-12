import type { AppProps } from 'next/app';
import { useAuth } from '@/hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  useAuth(); // This ensures the auth state is initialized

  return <Component {...pageProps} />;
}

export default MyApp;