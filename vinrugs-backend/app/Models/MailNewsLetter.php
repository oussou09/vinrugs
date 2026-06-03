<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailNewsLetter extends Model
{
    protected $table = 'mail_news_letters';

    protected $fillable = ['email'];
}
