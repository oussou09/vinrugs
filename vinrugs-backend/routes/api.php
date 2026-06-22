<?php

use App\Http\Controllers\AdminsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\MailNewsLetterController;
use App\Http\Controllers\RugsController;
use App\Http\Controllers\RugsOrdersController;
use App\Http\Controllers\UserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});





Route::prefix('user')->group(function (){

    Route::post('/loginuser', [UserController::class, 'LoginUser']);
    Route::post('/storeuser', [UserController::class, 'StoreUser']);

    Route::post('/contactus',[ContactUsController::class, 'StoreContact']);
    Route::post('/mailnewsletter',[MailNewsLetterController::class, 'StoreMNL']);
    Route::get('/rugs',[RugsController::class, 'IndexRugs']);

    Route::middleware(['auth:sanctum', 'abilities:user'])->group(function () {
        Route::get('/getuser',[UserController::class ,'ShowUser']);
        Route::post('/addcarduser',[UserController::class, 'AddCardUser']);
        Route::post('/logoutuser', [UserController::class, 'LogoutUser']);
        Route::post('/arwishlist', [UserController::class, 'ARWishlist']);
        Route::post('/addcartrug',[RugsController::class, 'UserTCart']);
        Route::post('/removecartrug',[RugsController::class, 'RemoveRugsCart']);
        Route::post('/checkdiscount', [DiscountController::class, 'CheckDiscount']);
        Route::post('/checkoutpayment', [RugsController::class, 'CheckoutPayment']);
        Route::post('/storeorders', [RugsOrdersController::class, 'StoreOrders']);
    });
});


Route::prefix('admin')->group(function () {

    Route::post('/loginadmin', [AdminsController::class, 'AdminLogin']);

    Route::middleware(['auth:sanctum', 'abilities:admin'])->group(function () {
        Route::get('/admininfos', [AdminsController::class, 'AdminInfos']);
        Route::post('/logoutadmin', [AdminsController::class, 'LogoutAdmin']);
        Route::get('/contacts', [ContactUsController::class, 'GetContacts']);
        Route::get('/getusers', [AdminsController::class, 'GetUsers']);
        Route::get('/getadproducts',[AdminsController::class, 'GetProducts']);
        Route::get('/getorders', [AdminsController::class, 'GetOrders']);
        Route::post('/addrug',[AdminsController::class, 'StoreRug']);

        Route::post('/deleteuser', [AdminsController::class, 'DeleteUser']);
        Route::post('/deleterug', [AdminsController::class, 'DeleteRug']);
    });

});
