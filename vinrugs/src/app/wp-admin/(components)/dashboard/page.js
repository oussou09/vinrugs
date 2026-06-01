// app/admin/dashboard/page.js
import StatCard from '@/app/wp-admin/(components)/StatCard'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#7B542F]">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sales" value="$24,850" change="+12.5%" bgColor="bg-[#7B542F]" />
        <StatCard title="Orders" value="342" change="+8.2%" bgColor="bg-[#B6771D]" />
        <StatCard title="Products" value="128" change="+2" bgColor="bg-[#FF9D00]" />
        <StatCard title="Customers" value="1,240" change="+18%" bgColor="bg-[#FFCF71]" />
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-[#eddcc9]">
        <h2 className="text-lg font-semibold text-[#7B542F] mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#B6771D] uppercase bg-[#fdf6ec]">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
                <td className="px-4 py-3 font-medium text-[#7B542F]">#VR-1001</td>
                <td className="px-4 py-3">Sarah Johnson</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Shipped</span></td>
                <td className="px-4 py-3 font-medium">$320</td>
              </tr>
              <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
                <td className="px-4 py-3 font-medium text-[#7B542F]">#VR-1002</td>
                <td className="px-4 py-3">Michael Chen</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Processing</span></td>
                <td className="px-4 py-3 font-medium">$780</td>
              </tr>
              <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
                <td className="px-4 py-3 font-medium text-[#7B542F]">#VR-1003</td>
                <td className="px-4 py-3">Emma Williams</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Delivered</span></td>
                <td className="px-4 py-3 font-medium">$150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}