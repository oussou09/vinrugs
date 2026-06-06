<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use App\Models\Discount;
use App\Models\Rugs;
use App\Models\Rugs_imges;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

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
        $isUnlimited = $rug->rug_quantity == 0;

        if (!$isUnlimited && $rug->rug_quantity < $validateData['rug_Quantity']) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        // if ($rug->rug_quantity === 0 ) {

        // }

        $cartItem = Carts::where('user_id', $user->id)
            ->where('rug_id', $request->rug_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $validateData['rug_Quantity'];

            if (!$isUnlimited && $rug->rug_quantity < $newQuantity) {
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
     * Checkout Payment.
     */
    public function CheckoutPayment(Request $request)
    {
        $user = $request->user()->load('cart_shopping.rug');

        Log::info('Incoming Request Data:', $request->all());

        Log::info("---------------------------");

        Log::info($user->cart_shopping);

        $hasSavedCard = $request->filled('idCard') && $request->filled('cvc');
        $hasNewCard = $request->filled('cardnumber') && $request->filled('expiry') && $request->filled('cvc');

        if (!$hasSavedCard && !$hasNewCard) {
            return response()->json(['message' => 'Card information is required.'], 422);
        }

        try {
            $validatorData = $request->validate([
                'Fname' => 'required|string' ,
                'Lname' => 'required|string' ,
                'email' => 'required|email',
                'address' => 'required|string' ,
                'city' => 'required|string' ,
                'postal_code' => 'required|string' ,
                'DiscountCode' => 'nullable|string' ,
            ]);

            // amount calc

            $cartSubtotal = 0;
            $totalQuantity = 0;

            foreach ($user->cart_shopping as $cartItem) {
                if ($cartItem->rug) {
                    $qty = (int) $cartItem->cart_rug_quantity;
                    $price = (float) $cartItem->rug->rug_price;

                    $cartSubtotal += $price * $qty;
                    $totalQuantity += $qty;
                }
            }

            $shippingPrice = ($cartSubtotal * $totalQuantity) / 100;
            $priceWithShipping = $cartSubtotal + $shippingPrice;

            $discountCode = $validated['DiscountCode'] ?? null;
            $discount = $discountCode
                ? Discount::where('discount_title', $discountCode)->first()
                : null;

            $discountPercent = (float) ($discount?->discount_porcent ?? 0);
            $discountAmount = ($priceWithShipping * $discountPercent) / 100;
            $finalPrice = $priceWithShipping - $discountAmount;

            Log::info('checkout totals', [
                'cartSubtotal' => $cartSubtotal,
                'totalQuantity' => $totalQuantity,
                'shippingPrice' => $shippingPrice,
                'priceWithShipping' => $priceWithShipping,
                'discountPercent' => $discountPercent,
                'discountAmount' => $discountAmount,
                'finalPrice' => $finalPrice,
            ]);

            return response()->json([
                'message' => 'Checkout calculated successfully',
                'subtotal' => $cartSubtotal,
                'shipping' => $shippingPrice,
                'discount_percent' => $discountPercent,
                'discount_amount' => $discountAmount,
                'final_total' => $finalPrice,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while checkout: ' . $e->getMessage()
            ], 500);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove rug from cart user.
     */
    public function RemoveRugsCart(Request $request)
    {
        $user = $request->user();

        $validateData = $request->validate([
            'rug_id' => 'required|exists:rugs,id',
        ]);

        $deleted = Carts::where('user_id', $user->id)->where('rug_id', $validateData['rug_id'])->delete();

        if (!$deleted) {

            return response()->json([
                'message' => 'The Rug is not in your Cart'
            ], 404);

        }
            return response()->json([
                'message' => 'The Rug is Deleted from your Cart'
            ], 200);

    }
}
