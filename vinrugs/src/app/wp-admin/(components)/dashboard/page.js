"use client";
import StatCard from '@/app/wp-admin/(components)/StatCard'
import { useAppAdmin } from '../../AdminLib/AppContextAdmin'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiClient } from '@/app/lib/api';
import toast from 'react-hot-toast';

export default function Dashboard() {


  const {adminToken, refetchOrders, orders, ordersLoad ,AdProductsCount ,contactsCount ,usersCount, ordersCount, usersLoad, AdProductsLoad, contactsLoad} = useAppAdmin()
  const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm();
  

  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  const [trackingIsOpen, setTrackingIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  console.log('orders: ', orders);

  const [totalMount, setTotalMount] = useState(0);

  useEffect(() => {
      const total = orders?.reduce((sum, order) => {
        return sum + Number(order.total_amount || 0);
      }, 0);

      setTotalMount(total);
  }, [orders])

  const GetFiltredOrder = (OrderId) => {
    // setSelectedOrder(null);
    const FiltredItem = orders.filter(item => (item.id === OrderId));
    setSelectedOrder(FiltredItem);
    console.log('selectedOrder: ', selectedOrder)
    setDetailsIsOpen(true);
  }

  const OnSubmit = async (data, OrderId) => {

    try {
      const dataForm = new FormData();
      dataForm.append('order_id', OrderId);
      dataForm.append('delivery_companies', data.shipping_company);
      dataForm.append('tracking_number', data.tracking_number);

      console.log('dataForm: ',dataForm)

      const resp = await apiClient.post('/admin/tracking', dataForm, {
        headers:{
          Authorization: adminToken
        }
      });
      if (resp.status === 200) {
        setTrackingIsOpen(false)
        await refetchOrders();
        toast.success(resp.data.message);
      }
      
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Something went wrong.");
    }

  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#7B542F]">Dashboard</h1>
      {/* <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Sales" value={`$${(totalMount ?? 0).toFixed(2)}`} change="+12.5%" bgColor="bg-[#7B542F]" loading={ordersLoad} />
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
                <th className="px-4 py-3">Actions</th>
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
                  <td className="px-4 py-3 font-medium">
                    <button
                    className='mr-3 text-blue-500 px-6 py-2.5 rounded-lg bg-transparent text-sm font-semibold hover:bg-muted active:scale-95 transition-all duration-200'
                    onClick={() => GetFiltredOrder(order.id) }>Details</button>
                    {/* Modal Order Details */}
                    {detailsIsOpen && (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={() => setDetailsIsOpen(false)}
                      >
                        <div
                          className="bg-white rounded-2xl shadow-2xl w-4/5 max-w-lg mx-10 px-14 py-8 relative border-[4px] border-[#8B5E3C] border-solid"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close Button */}
                          <button
                            onClick={() => setDetailsIsOpen(false)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-700 text-2xl leading-none"
                          >
                            &times;
                          </button>

                          <h2 className="text-2xl font-bold text-[#3b2a1a] mb-6">
                            Order Details
                          </h2>

                          { !selectedOrder ?
                            (<div>

                            </div>
                          ) : (

                          <div className="flow-root">
                          <dl className="-my-3 divide-y divide-gray-200 text-lg *:even:bg-gray-50">
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                              <dt className="font-medium text-gray-900">Full Name</dt>

                              <dd className="text-gray-700 sm:col-span-2">{ selectedOrder?.[0].shipping_name }</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                              <dt className="font-medium text-gray-900">Email</dt>

                              <dd className="text-gray-700 sm:col-span-2">{ selectedOrder?.[0].shipping_user_mail }</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                              <dt className="font-medium text-gray-900">Status</dt>

                              <dd className="text-gray-700 sm:col-span-2">{ selectedOrder?.[0].status }</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                              <dt className="font-medium text-gray-900">Adress shipping</dt>

                              <dd className="text-gray-700 sm:col-span-2">
                                { selectedOrder?.[0].shipping_adress }, { selectedOrder?.[0].shipping_city }, { selectedOrder?.[0].shipping_postalcode }, { selectedOrder?.[0].shipping_country }
                              </dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                              <dt className="font-medium text-gray-900">Mount</dt>

                              <dd className="text-gray-700 sm:col-span-2">
                                ${ selectedOrder?.[0].total_amount }
                              </dd>
                            </div>

                            { selectedOrder?.[0].discount_name != null ?
                              (
                              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">Discount</dt>

                                <dd className="text-gray-700 sm:col-span-2">● { selectedOrder?.[0].discount_name } <br/> ● { selectedOrder?.[0].discount_porcent } <br/> ● ${ selectedOrder?.[0].discount_mount } </dd>
                              </div>
                              ) : (<></>)}

                            { selectedOrder?.[0].orders_tracking && (
                              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">Mount</dt>

                                <dd className="text-gray-700 sm:col-span-2">
                                  ● { selectedOrder?.[0].orders_tracking.delivery_companies === 1 ? "FedEx"
                                  : selectedOrder?.[0].orders_tracking.delivery_companies === 2 ? "Aramex"
                                  : selectedOrder?.[0].orders_tracking.delivery_companies === 3 ? "DHL"
                                  : null }
                                  <span className='ml-2'>{ selectedOrder?.[0].orders_tracking?.tracking_number }</span>
                                </dd>
                              </div>
                            )}

                          </dl>
                        </div>
                        )}
                        </div>
                      </div>
                    )}
                    { !order.orders_tracking && (
                      <button onClick={() => setTrackingIsOpen(true)} className='px-6 text-green-300 py-2.5 rounded-lg bg-transparent text-sm font-semibold hover:bg-muted active:scale-95 transition-all duration-200'>Tracking</button>
                    )}
                  
                    {/* Modal Order Details */}
                    { trackingIsOpen && (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={() => setTrackingIsOpen(false)}
                      >
                        <div
                          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 relative border-[4px] border-[#8B5E3C] border-solid"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close Button */}
                          <button
                            onClick={() => setTrackingIsOpen(false)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-700 text-2xl leading-none"
                          >
                            &times;
                          </button>

                          <h2 className="text-2xl font-bold text-[#3b2a1a] mb-6">
                            Submit the Tracking
                          </h2>
                          
                          <form onSubmit={ handleSubmit((data) => OnSubmit(data, order.id)) } className="flex flex-col gap-4">

                            <div>
                              <label className="block text-lg font-medium text-gray-700 mb-1">
                                Shipping Company
                              </label>
                              <select
                                name="shipping_company"
                                required
                                {...register("shipping_company", { required: "Shipping Ccompany is required" })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] text-lg"
                              >
                                {errors.shipping_company && <span className="text-red-500">{errors.shipping_company.message}</span>}
                                <option >Select Company...</option>
                                <option value={1}>FedEx</option>
                                <option value={2}>Aramex</option>
                                <option value={3}>DHL</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-lg font-medium text-gray-700 mb-1">
                                Tracking Number
                              </label>
                              <input
                                type="text"
                                name="tracking_number"
                                required
                                {...register("tracking_number", { required: "tracking_number is required" })}
                                placeholder="N:..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] text-lg"
                              />
                              {errors.tracking_number && <span className="text-red-500">{errors.tracking_number.message}</span>}
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg font-semibold hover:bg-[#6f4a2f] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? "Submition..." : "Submit The Traking"}
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  
                  </td>
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