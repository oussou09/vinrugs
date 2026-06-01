<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ccuser extends Model
{
    protected $table = 'ccuser';
    protected $fillable = ['user_id', 'full_name', 'card_number', 'expiration_date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
