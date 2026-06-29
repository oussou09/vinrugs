"use client";
import Link from "next/link";
import { useAppAdmin } from "../../AdminLib/AppContextAdmin";
import { apiClient } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useState } from "react";

// components/admin/ProductManager.js
export default function ProductManager() {

  const {AdProducts, AdProductsLoad, adminToken, refetchProducts} = useAppAdmin()
  console.log('AdProducts from products page: ',AdProducts)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRug, setSelectedRug] = useState(null);

  const HandleDelete = async () => {
    console.log('selectedRug before : ',selectedRug)
    try {
      
      const resp = await apiClient.post('/admin/deleterug', {id: selectedRug.id}, {
        headers:{
          Authorization:adminToken
        }
      })
      if (resp.status === 200) {
        toast.success(resp.data.message);
        await refetchProducts();
        setIsOpen(false)
        setSelectedRug(null)
        console.log('selectedRug after : ',selectedRug)
      }

    } catch (error) {
      toast.error(error || "Someting Wrong");
      console.error("Error fetching data ", error);
    }
  }

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
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            { AdProductsLoad ?
            (
              <tr className="border-t border-[#f0e4d3] animate-pulse">
                <td className="px-5 py-3">
                  <div className="h-12 w-12 rounded-lg bg-[#f0e4d3]" />
                </td>
                <td className="px-5 py-3">
                  <div className="h-4 w-36 bg-[#f0e4d3] rounded" />
                </td>
                <td className="px-5 py-3">
                  <div className="h-3 w-14 bg-[#f5e6d3] rounded" />
                </td>
                <td className="px-5 py-3">
                  <div className="h-5 w-14 bg-[#f0e4d3] rounded-full" />
                </td>
                <td className="px-5 py-3">
                  <div className="flex space-x-2">
                    <div className="h-3 w-10 bg-[#f5e6d3] rounded" />
                    <div className="h-3 w-12 bg-[#f5e6d3] rounded" />
                  </div>
                </td>
              </tr>
            )
            : ! AdProducts?.length === 0 ?
            (
              <tr>
                <td colSpan="5" className="px-5 py-12">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4c4a8]">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-[#7B542F] text-sm">No Products Found</h3>
                      <p className="text-xs text-stone-400 mt-1">Add your first vintage rug to the collection.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )
            :
            (
              <>
              { AdProducts?.map((AdProduct) => (
                  <tr key={AdProduct.id} className="border-t-3 border-[#f0e4d3] hover:bg-[#fdf6ec]">
                    <td className="px-5 py-2"><div className="h-12 w-12 rounded-lg bg-[#f0e4d3] flex items-center justify-center text-[#7B542F]">🧶</div></td>
                    <td className="px-5 py-2 font-medium text-[#7B542F]">{AdProduct.rug_title}</td>
                    <td className="px-5 py-2">${AdProduct.rug_price}</td>
                    <td className="px-5 py-2"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{AdProduct.rug_quantity <= 0 ? 'ullimited' : `${AdProduct.rug_quantity} left`}</span></td>
                    <td className="px-5 py-2 space-x-2">
                      <button disabled title="Not Allowed Yet" className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                      <button onClick={() => {setIsOpen(true); setSelectedRug(AdProduct)}} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </td>
                  </tr>
              ))}
              </>
            )}
          </tbody>
        </table>
          {isOpen && selectedRug && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center bg-white shadow-2xl rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200"
              >
                <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                      stroke="#DC2626"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Do you really want to continue? This action<br />cannot be undone.
                </p>

                <div className="flex items-center justify-center gap-4 mt-5 w-full">
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { HandleDelete(); }}
                    type="button"
                    className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}