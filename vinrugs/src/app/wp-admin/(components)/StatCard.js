// components/admin/StatCard.js
export default function StatCard({ title, value, change, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-5 text-white`}>
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="mt-2 text-xs opacity-80">{change} from last month</p>
    </div>
  )
}