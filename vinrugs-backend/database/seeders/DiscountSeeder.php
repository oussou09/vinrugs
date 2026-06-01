<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('discounts')->insert([
            [
                'discount_title' => 'WELCOME10',
                'discount_porcent' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'SUMMER15',
                'discount_porcent' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'NEWUSER20',
                'discount_porcent' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'VIP25',
                'discount_porcent' => 25,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'FLASH5',
                'discount_porcent' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'SPRING12',
                'discount_porcent' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'AUTUMN18',
                'discount_porcent' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'WINTER30',
                'discount_porcent' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'RUGSALE8',
                'discount_porcent' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'discount_title' => 'SPECIAL22',
                'discount_porcent' => 22,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
