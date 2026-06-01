<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rugs_imges extends Model
{
    protected $table = 'rug_imges';

    protected $fillable = ['rug_id', 'main_rug_path', 'second_path_img'];

    public function rug(){
        return $this->hasOne(Rugs::class);
    }
}
