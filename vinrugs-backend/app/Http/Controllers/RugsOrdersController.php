<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use App\Models\Discount;
use App\Models\OrderItems;
use App\Models\Rugs;
use App\Models\RugsOrders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class RugsOrdersController extends Controller
{

    /**
     * Completing The Orders.
     */
    public function StoreOrders(Request $request)
    {

    Log::info("---------------------------");

    Log::info('Incoming Request Data:', $request->all());

    Log::info("---------------------------");

    $user = $request->user();

    try {

        $validator = $request->validate([
            'Fname' => 'required|string',
            'Lname' => 'required|string',
            'VarCountrie' => 'required|string',
            'address' => 'required',
            'city' => 'required|string',
            'postal_code' => 'required|integer',
            'email' => 'required|email',
            'card_token' => 'required',
            'DiscountCode' => 'nullable|string',
        ]);

        // start amount calc

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

        $discountCode = $validator['DiscountCode'] ?? null;
        $discount = $discountCode
            ? Discount::where('discount_title', $discountCode)->first()
            : null;

        $discountPercent = (float) ($discount?->discount_porcent ?? 0);
        $discountAmount = ($priceWithShipping * $discountPercent) / 100;
        $finalPrice = $priceWithShipping - $discountAmount;
        // end amount calc


        $rugs_order = RugsOrders::create([
            'user_id' => $user->id,
            'stripe_payment_intent_id' => $validator['card_token'],
            'submount' => $cartSubtotal,
            'shipping_price' => $shippingPrice,
            'discount_name' => $discount->discount_title ?? null,
            'discount_porcent' => $discount->discount_porcent ?? 0,
            'discount_mount' => $discountAmount,
            'total_amount' => $finalPrice,

            'shipping_name' => "{$validator['Fname']} {$validator['Lname']}",
            'shipping_user_mail' => $validator['email'],
            'shipping_adress' => $validator['address'],
            'shipping_city' => $validator['city'],
            'shipping_postalcode' => $validator['postal_code'],
            'shipping_country' => $validator['VarCountrie'],
        ]);

        foreach ($user->cart_shopping as $cart_rugs){
            if (!$cart_rugs->rug) continue;

            $qty = $cart_rugs->cart_rug_quantity;
            $Prc_rg = $cart_rugs->rug->rug_price;
            $total_rg = $qty * $Prc_rg;
            OrderItems::create([
                'order_id' => $rugs_order->id,
                'rug_id' => $cart_rugs->rug->id,
                'order_rug_quantity' => $qty,
                'order_rug_price' => $Prc_rg,
                'order_total_price' => $total_rg,
            ]);
            $selectedRug = Rugs::where('id', $cart_rugs->rug->id)->first();
            if ($selectedRug) {
                $selectedRug->update([
                    'rug_quantity' => $selectedRug->rug_quantity - $qty
                ]);
            }
            Carts::where('user_id', $user->id)->where('rug_id', $cart_rugs->rug->id)->delete();
        }



        return response()->json([
            'message' => 'Order Completed'
        ], 200);

    }  catch (\Throwable $th) {
             report($th);

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

}
