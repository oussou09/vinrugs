"use client";
import { useAppAdmin } from "../AdminLib/AppContextAdmin"

// app/admin/Header.js
export default function Header() {

  const { adminInfos, adminInfosLoad } = useAppAdmin();

  return (
    <header className="bg-white shadow-sm border-b border-[#eddcc9] h-16 flex items-center justify-between px-4 md:px-6">
      <button className="lg:hidden p-2 rounded-md text-[#7B542F] hover:bg-[#fdf6ec]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex-1" />
      { adminInfosLoad ?
      (
        // Loading skeleton
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="h-4 w-28 bg-[#f0e4d3] rounded hidden sm:block" />
          <div className="h-9 w-9 rounded-full bg-[#f0e4d3]" />
        </div>
      )
      :
      (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[#5a3e24] hidden sm:block">Admin ({adminInfos?.fullname})</span>
          <div className="h-9 w-9 rounded-full bg-[#FFCF71] flex items-center justify-center text-white font-medium">
            A
          </div>
        </div>
      )

      }

    </header>
  )
}