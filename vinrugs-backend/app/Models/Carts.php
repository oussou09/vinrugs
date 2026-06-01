<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    protected $table = 'cart_shopping';

    protected $fillable = [
        'user_id',
        'rug_id',
        'cart_rug_quantity',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function rug()
    {
        return $this->belongsTo(Rugs::class, 'rug_id');
    }
}
