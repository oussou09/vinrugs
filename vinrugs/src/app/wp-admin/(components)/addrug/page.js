// components/admin/AddProductForm.js
"use client";

import {apiClient} from "@/app/lib/api";
import Link from "next/link";
import { useForm } from 'react-hook-form';

export default function AddProductForm() {

  const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm({defaultValues: {quantity: 0 }});

  const onSubmit = async (data) => {

    try {

      const dataForm = new FormData();
      dataForm.append('rug_title' , data.title)
      dataForm.append('rug_description' , data.description)
      dataForm.append('rug_category' , Number(data.category))
      dataForm.append('rug_quantity' , data.quantity)
      dataForm.append('rug_price' , data.price)

      if (data.main_image && data.main_image.length > 0) {
        dataForm.append('main_rug_path', data.main_image[0])
      }
      if (data.second_image && data.second_image.length > 0) {
        dataForm.append('second_path_img', data.second_image[0])
      }

      // الطريقة الوحيدة لرؤية محتوى FormData في الكونسول:
      dataForm.forEach((value, key) => {
        console.log(key, value);
      });

      const resp =  await apiClient.post('/addrug', dataForm);
      if(resp.status === 200 || resp.status === 201 ){
        alert("Rug added successfully!");
        console.log(resp)
        reset()
      }
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        console.error('Connection Error:', errorMessage);
    }


  }

  const inputStyle = "w-full px-4 py-2.5 border-2 border-[#d4c4a8] rounded-lg focus:border-[#FF9D00] focus:ring-4 focus:ring-[#FF9D00]/10 outline-none transition-all duration-200 bg-white text-[#5a3e24]";

  return (
    <div className="bg-white rounded-xl shadow border border-[#eddcc9] p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#7B542F] mb-6">Add New Rug</h2>
      
      <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Product Name</label>
            <input
              { ...register ("title",{ required: "Product Name is required"})}
              type="text"
              name="title"
              className={inputStyle}
              placeholder="e.g., Persian Wool Rug"
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Price (USD)</label>
            <input
              { ...register ("price",{ required: "Price is required"})}
              type="number"
              name="price"
              className={inputStyle}
              placeholder="0.00"
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Stock Quantity (if is Stock unlimited put 0 and if is the Stock limited put the number)</label>
            <input
              { ...register ("quantity",{ required: "Product Name is required", min:0})}
              type="number"
              name="quantity"
              className={inputStyle}
              placeholder="0"
            />
            {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
          </div>
          <div className="mt-[20px]">
            <label className="block text-sm font-medium text-[#5a3e24] mb-1">Category</label>
            <select 
              {...register("category", { required: "Category is required" })}
              defaultValue={4} 
              className={inputStyle}
            >
              <option value={1}>Persian</option>
              <option value={2}>Turkish</option>
              <option value={3}>Moroccan</option>
              <option value={4}>Modern</option>
            </select>
            {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5a3e24] mb-1">Description</label>
          <textarea
            { ...register ("description",{ required: "Description is required"})}
            name="description"
            className={inputStyle}
            rows="4"
            placeholder="Rug materials, dimensions, care instructions..."
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Image Import Section */}
        <div>
          <label className="block text-sm font-medium text-[#5a3e24] mb-2">Rug Images</label>
          
          {/* Upload Area */}
          {/* قسم رفع الصور - تم تحديث الـ Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-2 text-center">Main Image</label>
            <input 
              type="file" 
              {...register("main_image", { required: "Main image is required" })}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFCF71] file:text-[#7B542F] hover:file:bg-[#ffc342]"
            />
            {errors.main_image && <span className="text-red-500">{errors.main_image.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e24] mb-2 text-center">Second Image (Optional)</label>
            <input 
              type="file" 
              {...register("second_image")}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e4d3] file:text-[#7B542F] hover:file:bg-[#eddcc9]"
            />
          </div>
        </div>

          {/* Image Previews (static example) */}
          {/* <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-4 border-[#FF9D00] shadow-md">
                <div className="w-full h-full bg-[#f0e4d3] flex items-center justify-center text-3xl text-[#7B542F]">
                  🧶
                </div>
              </div>
              <span className="absolute top-2 left-2 bg-[#FF9D00] text-white text-xs px-2 py-1 rounded-full font-medium">
                Main
              </span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button className="bg-white text-[#7B542F] text-xs px-3 py-1 rounded-full shadow">Remove</button>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#eddcc9]">
                <div className="w-full h-full bg-[#f5e6d3] flex items-center justify-center text-3xl text-[#B6771D]">
                  🧶
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button className="bg-white text-[#7B542F] text-xs px-3 py-1 rounded-full shadow mr-1">Set as Main</button>
                <button className="bg-white text-red-600 text-xs px-3 py-1 rounded-full shadow">Remove</button>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#eddcc9]">
                <div className="w-full h-full bg-[#f5e6d3] flex items-center justify-center text-3xl text-[#B6771D]">
                  🧶
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button className="bg-white text-[#7B542F] text-xs px-3 py-1 rounded-full shadow mr-1">Set as Main</button>
                <button className="bg-white text-red-600 text-xs px-3 py-1 rounded-full shadow">Remove</button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-[#f0e4d3]">
          <Link
            href="/wp-admin/products"
            className="px-6 py-2.5 border border-[#d4c4a8] text-[#7B542F] font-medium rounded-lg hover:bg-[#fdf6ec] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#FF9D00] text-white font-medium rounded-lg hover:bg-[#b8871a] transition-colors shadow-sm"
            >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  )
}