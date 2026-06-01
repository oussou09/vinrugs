<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $table = 'discounts';

    protected $fillable = ['discount_title', 'discount_porcent'];


}
