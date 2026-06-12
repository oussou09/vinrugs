<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use App\Models\Discount;
use App\Models\Rugs;
use App\Models\Rugs_imges;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RugsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function IndexRugs()
    {
        $rugs = Rugs::with('rug_imges')->get();
        return Response()->json($rugs);
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
