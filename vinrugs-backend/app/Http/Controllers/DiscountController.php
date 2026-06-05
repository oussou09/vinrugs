<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DiscountController extends Controller
{
    //
        /**
     * Check Discount.
     */
    public function CheckDiscount(Request $request)
    {
        $user = $request->user();

        $validator = $request->validate([
            'DiscountCode' => 'required|string',
        ]);

        Log::info(["DiscountCode: ", $validator['DiscountCode'],
            "request: ", $request]);

        try {
            $DiscountInfos = Discount::where('discount_title', $validator['DiscountCode'])->first();
            if (!$DiscountInfos) {
                return response()->json([
                    'message' => 'Discount code not found'
                ], 404);
            }
            return response()->json([
                'message' => 'Discount '.$DiscountInfos->discount_porcent.'% apply',
                'DiscountInfos' => $DiscountInfos
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}
