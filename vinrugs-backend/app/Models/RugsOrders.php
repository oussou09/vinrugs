<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RugsOrders extends Model
{
    //
    protected $table='orders';
    protected $fillable = [
        'user_id',
        'stripe_payment_intent_id',
        'status',
        'submount',
        'shipping_price',
        'discount_name',
        'discount_porcent',
        'discount_mount',
        'total_amount',
        'shipping_name',
        'shipping_adress',
        'shipping_city',
        'shipping_postalcode',
        'shipping_country'
    ];

    public function order_items() {
        return $this->hasMany(OrderItems::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
