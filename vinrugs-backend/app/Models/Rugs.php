<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Rugs extends Model
{
    //
    protected $table = 'rugs';

    protected $fillable = ['rug_title', 'rug_slug', 'rug_description', 'rug_category', 'rug_quantity', 'rug_price'];


    public function rug_imges(){
        return $this->hasMany(Rugs_imges::class, 'rug_id');
    }

    public function cart_shopping()
    {
        return $this->hasMany(Carts::class, 'rug_id');
    }

    public function wishlists() {
        return $this->hasMany(Wishlists::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'wishlists', 'rug_id', 'user_id')
                    ->withTimestamps();
    }

    public function order_items()
    {
        return $this->hasMany(OrderItems::class, 'rug_id');
    }
}
