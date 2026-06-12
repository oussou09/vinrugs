"use client";
import { apiClient } from "@/app/lib/api"
import { useEffect, useState } from "react"
import { useAppAdmin } from "../../AdminLib/AppContextAdmin";

// components/admin/ContactReply.js
export default function ContactReply() {

  const {contacts, contactsLoad} = useAppAdmin(); 


  return (
    <div className="space-y-4">

      { contactsLoad ?
      (
        <div className="bg-white rounded-xl shadow border border-[#eddcc9] p-5 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
              <div className="space-y-2">
                <div className="h-4 w-36 bg-[#f0e4d3] rounded" />
                <div className="h-3 w-56 bg-[#f5e6d3] rounded" />
              </div>
              <div className="h-5 w-14 bg-[#fdf6ec] rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-[#f5e6d3] rounded" />
              <div className="h-3 w-3/4 bg-[#f5e6d3] rounded" />
            </div>
            <div className="flex space-x-3">
              <div className="flex-1 h-16 bg-[#f5e6d3] rounded-lg" />
              <div className="h-10 w-16 bg-[#f0e4d3] rounded-lg self-end" />
            </div>
        </div>
      )
      : !contacts?.length ?
      (
        <div className="bg-white rounded-xl shadow border border-[#eddcc9] p-8 flex flex-col items-center justify-center gap-3 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4c4a8]">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <div>
            <h3 className="font-semibold text-[#7B542F] text-sm">No Messages</h3>
            <p className="text-xs text-stone-400 mt-1">Your inbox is empty. New inquiries will appear here.</p>
          </div>
        </div>
      )
      :
      (
        <>
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl shadow border border-[#eddcc9] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[#7B542F]">
                    {
                        contact.type_problem === 1 ? "Private Viewing"
                      : contact.type_problem === 2 ? "Custom Commission"
                      : contact.type_problem === 3 ? "Order Status"
                      : contact.type_problem === 4 ? "Trade Program"
                      : "General Inquiry"
                    }
                  </h3>
                  <p className="text-sm text-gray-500">from {contact.full_name} ({contact.email}) • {contact.created_at?.split("T")[0]} {contact.created_at?.split("T")[1]?.split(".")[0]} ago</p>
                </div>
                <span className="text-xs bg-[#fdf6ec] text-[#B6771D] px-2 py-1 rounded-full mt-1 sm:mt-0">Unread</span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{contact.problem_description}...</p>
              <div className="flex space-x-3">
                <textarea
                  className="flex-1 p-3 border border-[#d4c4a8] rounded-lg text-sm focus:ring-2 focus:ring-[#FF9D00]"
                  placeholder="Write a reply..."
                  rows="2"
                />
                <button className="px-4 py-2 bg-[#FF9D00] text-white rounded-lg hover:bg-[#b8871a] text-sm self-end">
                  Send
                </button>
              </div>
            </div>
          ) )}
        </>
      )
      }

    </div>
  )
}