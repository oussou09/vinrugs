<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use App\Models\OrderItems;
use App\Models\Rugs;
use App\Models\Rugs_imges;
use App\Models\RugsOrders;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AdminsController extends Controller
{

    public function AdminLogin(Request $request) {
        Log::info($request->all());
        $validator = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[0-9]).+$/i'
        ]);

        if (!Auth::guard('admin')->attempt($validator)) {
            return response()->json([
                'message' => 'Invalid admin credentials' ,
            ],401);
        }

        $admin = Auth::guard('admin')->user();

        $AdminToken = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'token' => 'Bearer '.$AdminToken,
        ],200);

    }

    public function AdminInfos(Request $request)
    {
        $admin = $request->user();

        if (!$admin instanceof Admins) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        return response()->json([
            'admin' => $admin,
        ], 200);
    }

    public function GetUsers() {

        $users = User::all();

        return response()->json([
            'users' => $users
        ],200);
    }


    public function GetProducts() {

        $rugs = Rugs::with('rug_imges')->get();
        return response()->json([
            'rugs' => $rugs
        ],200);
    }

    public function GetOrders() {
        $orders = RugsOrders::with('order_items.rug')->get();

        return response()->json([
            'orders' => $orders
        ],200);
    }


    public function DeleteUser(Request $request) {

        $validator = $request->validate([
            'id' => 'required|integer|exists:users,id'
        ]);

        $user = User::find($validator['id']);

        if (!$user) {
            return response()->json([
                'message' => "user not found"
            ],404);
        }

        // $user->deleted();
        // Log::info([
        //     'user' => $user,
        //     'user_id' => $validator['id'],
        // ]);

        return response()->json([
            'message' => "user {$user->first_name} {$user->last_name} deleted successfully"
        ],200);
    }


    public function DeleteRug(Request $request) {

        $validator = $request->validate([
            'id' => 'required|integer|exists:rugs,id'
        ]);

        $rug = Rugs::find($validator['id']);

        if (!$rug) {
            return response()->json([
                'message' => "rug not found"
            ],404);
        }

        // Log::info([
        //     'rug' => $rug,
        //     'rug_id' => $validator['id'],
        // ]);

        $rug->delete();

        return response()->json([
            'message' => "rug {$rug->rug_title} deleted successfully"
        ],200);

    }



































    private function title_to_slug($title){
        return Str::slug($title, '-');
    }

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
}
