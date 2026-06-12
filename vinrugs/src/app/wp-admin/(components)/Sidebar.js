// app/admin/Sidebar.js
'use client';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {



  const rpath = usePathname();

  return (
    <aside className="w-64 bg-[#fff8f1] text-white flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[#8b6238]">
        <Link href="/wp-admin/dashboard" className="text-xl font-bold text-[#FFCF71]">
          VintageRugs
        </Link>
      </div>
      <nav className="mt-5 px-3 space-y-1 flex-1">
        <Link
          href="/wp-admin/dashboard"
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${rpath === '/wp-admin/dashboard' ? 'bg-[#FF9D00] text-white shadow' : 'text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white'}`}
        >
          <span className="mr-3 text-lg">📊</span> Dashboard
        </Link>
        <Link
          href="/wp-admin/products"
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${rpath === '/wp-admin/products' ? 'bg-[#FF9D00] text-white shadow' : 'text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white'}`}
        >
          <span className="mr-3 text-lg">🧶</span> Products
        </Link>
        <Link
          href="/wp-admin/users"
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${rpath === '/wp-admin/users' ? 'bg-[#FF9D00] text-white shadow' : 'text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white'}`}
        >
          <span className="mr-3 text-lg">👥</span> Users
        </Link>
        <Link
          href="/wp-admin/contacts"
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${rpath === '/wp-admin/contacts' ? 'bg-[#FF9D00] text-white shadow' : 'text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white'}`}
        >
          <span className="mr-3 text-lg">✉️</span> Contacts
        </Link>
      </nav>
    </aside>
  )
}