<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use App\Models\Rugs;
use App\Models\Rugs_imges;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RugsController extends Controller
{

    private function title_to_slug($title){
        return Str::slug($title, '-');
    }
    /**
     * Display a listing of the resource.
     */
    public function IndexRugs()
    {
        $rugs = Rugs::with('rug_imges')->get();
        return Response()->json($rugs);
    }

    /**
     * Store a newly created resource in storage.
     */
public function StoreRug(Request $request)
    {
        $request->validate([
            'rug_title' => 'required|string',
            'rug_description' => 'required|string',
            'rug_category' => 'required|integer|between:1,4',
            'rug_quantity' => 'nullable|integer|min:0',
            'rug_price' => 'required|numeric',
            'main_rug_path' => 'required|file|image|mimes:jpeg,png,jpg|max:2048',
            'second_path_img' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'third_path_img' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'fourth_path_img' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'video_path' => 'nullable|mimes:mp4,mov,avi|max:10240', // تعديل لنوع الفيديو وحجمه
        ]);

        $mainFile = $request->file('main_rug_path');

        // إنشاء Slug فريد
        $originalSlug = $this->title_to_slug($request->rug_title);
        $slug = $originalSlug;
        $count = 1;
        while (Rugs::where('rug_slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        // إنشاء سجل المنتج
        $rug_info_created = Rugs::create([
            'rug_title' => $request->rug_title,
            'rug_slug' => $slug,
            'rug_description' => $request->rug_description,
            'rug_category' => $request->rug_category,
            'rug_quantity' => $request->rug_quantity,
            'rug_price' => $request->rug_price,
        ]);

        // إعدادات تسمية الملفات
        $custom_name_title = $this->title_to_slug($request->rug_title); // استخدام العنوان الفعلي
        $time = time();

        // 1. الصورة الرئيسية
        $extensionMain = $mainFile->getClientOriginalExtension();
        $mainimg = $mainFile->storeAs('rugs/main_imges', $custom_name_title.'-'.$time.'.'.$extensionMain, 'public');
        $size = $mainFile->getSize();

        // 2. معالجة باقي الملفات بشكل ديناميكي لتجنب التكرار
        $images = ['second_path_img', 'third_path_img', 'fourth_path_img'];
        $paths = [];

        foreach ($images as $key => $field) {
            $paths[$field] = null;
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $ext = $file->getClientOriginalExtension();
                $paths[$field] = $file->storeAs(
                    'rugs/gallery',
                    $custom_name_title . '-' . ($time + $key + 1) . '.' . $ext,
                    'public'
                );
            }
        }

        // 3. معالجة الفيديو
        $mainvideo = null;
        if ($request->hasFile('video_path')) {
            $videoFile = $request->file('video_path');
            $extVideo = $videoFile->getClientOriginalExtension();
            $mainvideo = $videoFile->storeAs('rugs/videos', $custom_name_title . '-video-' . $time . '.' . $extVideo, 'public');
        }

        // حفظ في جدول الصور
        $Rug_imges = Rugs_imges::create([
            'rug_id' => $rug_info_created->id,
            'main_rug_path' => $mainimg,
            'second_path_img' => $paths['second_path_img'],
            'third_path_img' => $paths['third_path_img'],
            'fourth_path_img' => $paths['fourth_path_img'],
            'video_path' => $mainvideo,
            'main_rug_file_size' => $size,
        ]);

        return response()->json([
            'success' => true,
            'rug_imges' => $Rug_imges,
            'rug_info_created' => $rug_info_created,
        ], 200);
    }

    /**
     * Add rug to user cart
     */
    public function UserTCart(Request $request)
    {
        //
        $user = $request->user();
        $validateData = $request->validate([
            'rug_id' => 'required|exists:rugs,id',
            'rug_Quantity' => 'required|integer|min:1',
        ]);

        $rug = Rugs::findOrFail($validateData['rug_id']);

        if ($rug->rug_quantity < $validateData['rug_Quantity']) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cartItem = Carts::where('user_id', $user->id)
            ->where('rug_id', $request->rug_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $validateData['rug_Quantity'];

            if ($rug->rug_quantity < $newQuantity) {
                return response()->json([
                    'message' => 'Requested quantity exceeds stock'
                ], 422);
            }

            $cartItem->update([
                'quantity' => $newQuantity
            ]);
        } else {
            $cartItem = Carts::create([
                'user_id' => $user->id,
                'rug_id' => $request->rug_id,
                'cart_rug_quantity' => $validateData['rug_Quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Added to cart successfully',
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
