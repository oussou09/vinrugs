// app/admin/layout.js
"use client";
import Sidebar from '@/app/wp-admin/(components)/Sidebar'
import Header from '@/app/wp-admin/(components)/Header'
import AppContextAdmin from './AdminLib/AppContextAdmin'
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {

  const pathname = usePathname();

  const isLoginPage = pathname === "/wp-admin/login";
  const isAdminPage = pathname.startsWith("/wp-admin");

  return (
    <AppContextAdmin>
      <div className="bg-[#f9f6f0] min-h-screen flex">
          {/* "bg-black pt-20" */}
        
      
        {!isLoginPage && isAdminPage ? <Sidebar /> : null}

        <div className="flex-1 flex flex-col">
          {!isLoginPage && isAdminPage ? <Header /> : null}

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AppContextAdmin>
  );
}