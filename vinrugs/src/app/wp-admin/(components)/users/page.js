// components/admin/UserManager.js
export default function UserManager() {
  return (
    <div className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden">
      <div className="p-4 border-b border-[#f0e4d3] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#7B542F]">All Users</h2>
        <button className="px-4 py-2 bg-[#FF9D00] text-white rounded-lg hover:bg-[#b8871a] text-sm">+ Add User</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fdf6ec] text-[#B6771D]">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3 font-medium text-[#7B542F]">Sarah Johnson</td>
              <td className="px-5 py-3">sarah@example.com</td>
              <td className="px-5 py-3">Customer</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span></td>
              <td className="px-5 py-3 space-x-2">
                <button className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </td>
            </tr>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3 font-medium text-[#7B542F]">Michael Chen</td>
              <td className="px-5 py-3">michael@example.com</td>
              <td className="px-5 py-3">Admin</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span></td>
              <td className="px-5 py-3 space-x-2">
                <button className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </td>
            </tr>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3 font-medium text-[#7B542F]">Emma Williams</td>
              <td className="px-5 py-3">emma@example.com</td>
              <td className="px-5 py-3">Customer</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span></td>
              <td className="px-5 py-3 space-x-2">
                <button className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}