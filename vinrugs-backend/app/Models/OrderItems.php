<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    protected $table='order_items';
    protected $fillable = ['order_id' , 'rug_id' , 'order_rug_quantity' , 'order_rug_price' , 'order_total_price'];

    public function rugs_orders() {
        return $this->belongsTo(RugsOrders::class);
    }

    public function rug()
    {
        return $this->belongsTo(Rugs::class, 'rug_id');
    }
}
