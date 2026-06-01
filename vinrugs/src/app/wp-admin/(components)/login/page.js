// app/admin/login/page.js
export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6ec] to-[#f5e6d3]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-[#e7d7c1]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B542F]">VintageRugs</h1>
          <p className="text-[#B6771D] mt-1">Admin Panel</p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none"
              placeholder="admin@vintagerugs.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FF9D00] hover:bg-[#b8871a] text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}