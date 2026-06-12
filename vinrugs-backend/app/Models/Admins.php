<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Admins extends Authenticatable
{
     use HasApiTokens, Notifiable;

    protected $guard = 'admin';
    protected $table = 'admins';

    protected $fillable = [
        'fullname',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
