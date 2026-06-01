// app/admin/Sidebar.js
import Link from 'next/link'

export default function Sidebar() {
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
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium bg-[#FF9D00] text-white shadow"
        >
          <span className="mr-3">📊</span> Dashboard
        </Link>
        <Link
          href="/wp-admin/products"
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white"
        >
          <span className="mr-3">🧶</span> Products
        </Link>
        <Link
          href="/wp-admin/users"
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white"
        >
          <span className="mr-3">👥</span> Users
        </Link>
        <Link
          href="/wp-admin/contacts"
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-[#e7d7c1] hover:bg-[#8b6238] hover:text-white"
        >
          <span className="mr-3">✉️</span> Contacts
        </Link>
      </nav>
    </aside>
  )
}