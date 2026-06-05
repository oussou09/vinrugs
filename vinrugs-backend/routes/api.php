<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\MailNewsLetterController;
use App\Http\Controllers\RugsController;
use App\Http\Controllers\UserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/contactus',[ContactUsController::class, 'StoreContact']);
Route::get('/contacts', [ContactUsController::class, 'GetContacts']);
Route::post('/mailnewsletter',[MailNewsLetterController::class, 'StoreMNL']);

Route::post('/loginuser', [UserController::class, 'LoginUser']);
Route::post('/storeuser', [UserController::class, 'StoreUser']);

Route::post('/addrug',[RugsController::class, 'StoreRug']);
Route::get('/rugs',[RugsController::class, 'IndexRugs']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getuser',[UserController::class ,'ShowUser']);
    Route::post('/addcarduser',[UserController::class, 'AddCardUser']);
    Route::post('/logoutuser', [UserController::class, 'LogoutUser']);
    Route::post('/arwishlist', [UserController::class, 'ARWishlist']);
    Route::post('/addcartrug',[RugsController::class, 'UserTCart']);
    Route::post('/removecartrug',[RugsController::class, 'RemoveRugsCart']);
    Route::post('/checkdiscount', [DiscountController::class, 'CheckDiscount']);
    Route::post('/checkoutpayment', [RugsController::class, 'CheckoutPayment']);
});
