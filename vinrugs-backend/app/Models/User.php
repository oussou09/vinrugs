<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart()
    {
        return $this->hasOne(Carts::class);
    }

    public function ccusers()
    {
        return $this->hasMany(Ccuser::class, 'user_id');
    }

    public function wishlists() {
        return $this->hasMany(Wishlists::class);
    }

    public function rugs()
    {
        return $this->belongsToMany(Rugs::class, 'wishlists', 'user_id', 'rug_id')
                    ->withTimestamps();
    }
}
