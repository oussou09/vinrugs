<?php

namespace App\Http\Controllers;

use App\Models\Ccuser;
use App\Models\User;
use App\Models\Wishlists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function LoginUser(Request $request)
    {
        $validationdata = $request->validate([
            'email' => 'required|email' ,
            'password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[0-9]).+$/i'
        ]);

        if (!Auth::attempt($validationdata)) {
            return response()->json([
                'message' => 'user ' .$request->email. ' not Found' ,
            ],404);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Seccessfully',
            'access_token' => 'Bearer ' .$token,
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function StoreUser(Request $request)
    {
        try {
            $request->password == $request->confirmed_password;
        } catch (\Exception $e) {
            return response()->json(['error' => 'the password and confirmation not the same thing : ' . $e->getMessage()], 500);
        }

        $validationdata = $request->validate([
            'first_name' => 'required|string|between:3,50' ,
            'last_name' => 'required|string|between:3,50' ,
            'email' => 'required|email' ,
            'password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[0-9]).+$/i'
        ]);

        try {
            $userC = User::create([
            'first_name' => $validationdata['first_name'] ,
            'last_name' => $validationdata['last_name'] ,
            'email' => $validationdata['email'] ,
            'password' => Hash::make($validationdata['password']),
            ]);
            return response()->json(['message' => 'User profile created successfully', 'user' => $userC], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong while Creating user profile: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function ShowUser(Request $request)
    {
        try {
            $user = $request->user()->load([
                'rugs',
                'ccusers',
                'cart_shopping.rug.rug_imges'
            ]);

            return response()->json([
                'user' => $user,
                'UserWishRugs' => $user->rugs,
                'card_user' => $user->ccusers,
                'cart_shopping' => $user->cart_shopping,
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }

    /**
     * Logout the specified resource.
     */
    public function LogoutUser(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json(['message' => "user {$user->first_name} {$user->last_name} Logout seccesfully"]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

        /**
     * Show the form for editing the specified resource.
     */
    public function AddCardUser(Request $request)
    {
        $user = $request->user();
        $validDataRequest = $request->validate([
            'card_number' => 'required|string|min:12|max:25',
            'card_name' => 'required|string|between:3,100',
            'expire_date' => ['required', 'regex:/^[0-9]{2}\/[0-9]{2}$/'],
        ]);

        try {
            $ccuser = Ccuser::create([
            'user_id' => $user->id,
            'full_name' => $validDataRequest['card_name'] ,
            'card_number' => $validDataRequest['card_number'] ,
            'expiration_date' => $validDataRequest['expire_date']
        ]);

        return response()->json(['message' => 'Card added successfully', 'card' => $ccuser->full_name], 201);

        } catch (\Throwable $th) {
             report($th);

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function ARWishlist(Request $request)
    {

        $user = $request->user();

        if (!$user) {
            return response()->json([
            'message' => 'Unauthenticated',
            ], 401);
        }

        $validids = $request->validate([
            'rug_id' => 'required|integer|exists:rugs,id',
            'type_tret' => 'required|boolean'
        ]);

        try {

            if ($validids['type_tret']) {
                $user->rugs()->detach($validids['rug_id']);
                return response()->json(['message' => 'You remove the rug successfully in your Wishlist'], 201);
            }

            $user->rugs()->syncWithoutDetaching([$validids['rug_id']]);

            return response()->json(['message' => 'You added the rug successfully in your Wishlist'], 201);

        } catch (\Throwable $th) {
            //throw $th;
            report($th);

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage(),
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
