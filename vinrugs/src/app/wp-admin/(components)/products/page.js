import Link from "next/link";

// components/admin/ProductManager.js
export default function ProductManager() {
  return (
    <div className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden">
      <div className="p-4 border-b border-[#f0e4d3] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#7B542F]">All Products</h2>
        <Link href="/wp-admin/addrug" className="px-4 py-2 bg-[#FF9D00] text-white rounded-lg hover:bg-[#b8871a] text-sm">+ Add Product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fdf6ec] text-[#B6771D]">
            <tr>
              <th className="px-5 py-3">Image</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3"><div className="h-12 w-12 rounded-lg bg-[#f0e4d3] flex items-center justify-center text-[#7B542F]">🧶</div></td>
              <td className="px-5 py-3 font-medium text-[#7B542F]">Persian Wool Rug</td>
              <td className="px-5 py-3">$450</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">12 left</span></td>
              <td className="px-5 py-3 space-x-2">
                <button className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </td>
            </tr>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3"><div className="h-12 w-12 rounded-lg bg-[#f0e4d3] flex items-center justify-center text-[#7B542F]">🧶</div></td>
              <td className="px-5 py-3 font-medium text-[#7B542F]">Turkish Kilim</td>
              <td className="px-5 py-3">$320</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">8 left</span></td>
              <td className="px-5 py-3 space-x-2">
                <button className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </td>
            </tr>
            <tr className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
              <td className="px-5 py-3"><div className="h-12 w-12 rounded-lg bg-[#f0e4d3] flex items-center justify-center text-[#7B542F]">🧶</div></td>
              <td className="px-5 py-3 font-medium text-[#7B542F]">Moroccan Boujad</td>
              <td className="px-5 py-3">$690</td>
              <td className="px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">3 left</span></td>
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