<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_Tracking extends Model
{
    protected $table = 'order_trackings';

    protected $fillable = [
        'order_id',
        'delivery_companies',
        'tracking_number'
    ];

    public function tracking_order() {
        return $this->belongsTo(RugsOrders::class, 'order_id');
    }
}
