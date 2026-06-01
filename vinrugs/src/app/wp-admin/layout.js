// app/admin/layout.js

import Sidebar from '@/app/wp-admin/(components)/Sidebar'
import Header from '@/app/wp-admin/(components)/Header'



export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f9f6f0] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}