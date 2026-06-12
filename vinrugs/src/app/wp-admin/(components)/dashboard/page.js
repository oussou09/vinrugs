"use client";
import StatCard from '@/app/wp-admin/(components)/StatCard'
import { useAppAdmin } from '../../AdminLib/AppContextAdmin'
import { useEffect, useState } from 'react';

export default function Dashboard() {


  const {orders, ordersLoad ,AdProductsCount ,contactsCount ,usersCount, ordersCount, usersLoad, AdProductsLoad, contactsLoad} = useAppAdmin()

  console.log('orders: ', orders);

  const [totalMount, setTotalMount] = useState(0);

  useEffect(() => {
      const total = orders?.reduce((sum, order) => {
        return sum + Number(order.total_amount || 0);
      }, 0);

      setTotalMount(total);
  },[orders])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#7B542F]">Dashboard</h1>
      {/* <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Sales" value={`$${totalMount}`} change="+12.5%" bgColor="bg-[#7B542F]" loading={ordersLoad} />
        <StatCard title="Orders" value={ordersCount} change="+8.2%" bgColor="bg-[#B6771D]" loading={ordersLoad} />
        <StatCard title="Products" value={AdProductsCount} change="+2" bgColor="bg-[#FF9D00]" loading={AdProductsLoad} />
        <StatCard title="Customers" value={usersCount} change="+18%" bgColor="bg-[#FFCF71]" loading={usersLoad} />
        <StatCard title="Contacts" value={contactsCount} change="+18%" bgColor="bg-[#EFCF71]" loading={contactsLoad} />
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

              { ordersLoad ?
              (
                <tr className="border-t border-[#f0e4d3] animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 bg-[#f0e4d3] rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 w-28 bg-[#f5e6d3] rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-16 bg-[#f0e4d3] rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-12 bg-[#f5e6d3] rounded" />
                  </td>
                </tr>
              )
              : ! orders?.length === 0 ?
              (
                <tr className="border-t border-[#f0e4d3] animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 bg-[#f0e4d3] rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 w-28 bg-[#f5e6d3] rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-16 bg-[#f0e4d3] rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-12 bg-[#f5e6d3] rounded" />
                  </td>
                </tr>
              )
              :
              (
                <>
                {orders?.map((order) => (
                  
                <tr key={order.id} className="border-t border-[#f0e4d3] hover:bg-[#fdf6ec]">
                  <td className="px-4 py-3 font-medium text-[#7B542F]">#VR-1002</td>
                  <td className="px-4 py-3">{order.shipping_name}</td>
                  <td className="px-4 py-3">
                      {
                        order.status == 'pending' ? 
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                        :
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Delivered
                        </span>
                      }
                  </td>
                  <td className="px-4 py-3 font-medium">${order.total_amount}</td>
                </tr>

                ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}