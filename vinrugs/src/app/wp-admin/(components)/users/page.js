"use client";
import { apiClient } from "@/app/lib/api";
import { useAppAdmin } from "../../AdminLib/AppContextAdmin"
import toast from "react-hot-toast";

// components/admin/UserManager.js
export default function UserManager() {

  const {users, usersLoad, adminToken, refetchUsers} = useAppAdmin()

  console.log('users from page: ',users)


  const HandleDelete = async (UserId) => {

    console.log(UserId)

    try {
      
      const resp = await apiClient.post('/admin/deleteuser', {id: UserId},{
        headers:{
          Authorization : adminToken
        }
      })

      if (resp.status === 200) {
        toast.success(resp.data.message);
        await refetchUsers();
      }

    } catch (error) {
      toast.error(error || "Someting Wrong");
      console.error("Error fetching data ", error);
    }
  }


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
            { usersLoad ?
              (
                <tr className="border-t border-[#f0e4d3] animate-pulse">
                  <td className="px-5 py-3">
                    <div className="h-4 w-28 bg-[#f0e4d3] rounded" />
                  </td>
                  <td className="px-5 py-3">
                    <div className="h-3 w-36 bg-[#f5e6d3] rounded" />
                  </td>
                  <td className="px-5 py-3">
                    <div className="h-3 w-20 bg-[#f5e6d3] rounded" />
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
              : ! users?.length === 0 ?
              (
                  <tr>
                    <td colSpan="5" className="px-5 py-12">
                      <div className="flex flex-col items-center justify-center gap-3 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4c4a8]">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <div>
                          <h3 className="font-semibold text-[#7B542F] text-sm">No Users Found</h3>
                          <p className="text-xs text-stone-400 mt-1">Start adding users to manage your store.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
              )
              :
              (
              <>
                { users?.map((user) => (
                <tr key={user.id} className="border-t-3 border-[#f0e4d3] hover:bg-[#fdf6ec]">
                  <td className="px-5 py-4 font-medium text-[#7B542F]">{user.first_name} {user.last_name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">Customer</td>
                  <td className="px-5 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                  <td className="px-5 py-4 space-x-2">
                    <button disabled title="Not Allowed Yet" className="text-[#B6771D] hover:text-[#FF9D00] font-medium">Edit</button>
                    <button onClick={() => HandleDelete(user.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
                ))}
              </>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}