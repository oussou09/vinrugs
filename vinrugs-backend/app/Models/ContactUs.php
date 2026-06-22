<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    protected $table = 'contact_us';

    protected $fillable = ['full_name', 'email', 'type_problem', 'is_read', 'problem_description'];
}
