import { useState } from "react"

// components/admin/StatCard.js
export default function StatCard({ title, value, change, bgColor, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5 border border-[#eddcc9] animate-pulse min-h-[140px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-3 w-20 bg-[#f0e4d3] rounded" />
          <div className="h-8 w-24 bg-[#e7d7c1] rounded" />
        </div>
        <div className="h-2.5 w-32 bg-[#f5e6d3] rounded" />
      </div>
    );
  }

  const isMissing =
    title == null ||
    value == null ||
    change == null ||
    bgColor == null;

  if (isMissing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5 border border-[#eddcc9] flex flex-col items-center justify-center gap-2 text-center min-h-[140px]">
        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">
          No data yet
        </p>
      </div>
    );
  }

  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-5 text-white min-h-[140px]`}>
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="mt-2 text-xs opacity-80">{change} from last month</p>
    </div>
  );
}