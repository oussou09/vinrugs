'use client';

import ConditionalNavbar from '@/app/ConditionalNavFoot/ConditionalNavbar';
import ConditionalFooter from '@/app/ConditionalNavFoot/ConditionalFooter';
import { AppProvider } from '../lib/AppContext';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith('/wp-admin') || pathname.startsWith('/unauthorized');

  return (
    <AppProvider>
        {!hideLayout && <ConditionalNavbar />}

        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff7ed',
              color: '#7B542F',
              border: '1px solid #eddcc9',
            },
            success: {
              style: {
                background: '#ecfdf5',
                color: '#166534',
                border: '1px solid #86efac',
              },
            },
            error: {
              style: {
                background: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fca5a5',
              },
            },
          }}
        />

        {!hideLayout && <ConditionalFooter />}
    </AppProvider>
  );
}