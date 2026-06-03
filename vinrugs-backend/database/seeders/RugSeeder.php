<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rugs;
use App\Models\Rugs_imges;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class RugSeeder extends Seeder
{
    public function run()
    {
        // 1. تنظيف الجداول وتصفير الـ IDs
        Schema::disableForeignKeyConstraints();
        DB::table('rug_imges')->truncate();
        DB::table('rugs')->truncate();
        Schema::enableForeignKeyConstraints();

        // 2. البيانات الدقيقة لجدول الصور التي أرسلتها
        $specificImages = [
            1 => ['main' => 'rugs/main_imges/rug-title-24723565740.jpg',  'sec' => 'rugs/second_images/rug-title-2472315001950.jpg.jpg', 'time' => '2026-05-14 00:50:23'],
            3 => ['main' => 'rugs/main_imges/rug-title-24583.jpg',  'sec' => 'rugs/second_images/rug-title-2458315001950.jpg', 'time' => '2026-05-14 00:50:23'],
            5 => ['main' => 'rugs/main_imges/rug-title-15239565740.jpg',  'sec' => 'rugs/second_images/rug-title-1523915001950.jpg', 'time' => '2026-05-14 00:50:23'],
            6 => ['main' => 'rugs/main_imges/rug-title-1044915001950.jpg',  'sec' => 'rugs/second_images/rug-title-10449200260.jpg', 'time' => '2026-05-14 00:50:23'],
            7 => ['main' => 'rugs/main_imges/rug-title-1201280365.jpg',  'sec' => 'rugs/second_images/rug-title-1201280365.jpg', 'time' => '2026-05-14 00:50:23'],
            8 => ['main' => 'rugs/main_imges/rug-title-21355565740.jpg',  'sec' => 'rugs/second_images/rug-title-2135515001950.jpg', 'time' => '2026-05-14 00:50:23'],
            9  => ['main' => 'rugs/main_imges/rug-title-1778635622.jpeg', 'sec' => null, 'time' => '2026-05-13 01:27:02'],
            10 => ['main' => 'rugs/main_imges/rug-title-1778719133.jpeg', 'sec' => null, 'time' => '2026-05-14 00:38:53'],
            11 => ['main' => 'rugs/main_imges/rug-title-1778719145.jpeg', 'sec' => null, 'time' => '2026-05-14 00:39:05'],
            12 => ['main' => 'rugs/main_imges/rug-title-1778719159.jpeg', 'sec' => null, 'time' => '2026-05-14 00:39:19'],
            13 => ['main' => 'rugs/main_imges/rug-title-1778719170.jpeg', 'sec' => null, 'time' => '2026-05-14 00:39:30'],
            14 => ['main' => 'rugs/main_imges/rug-title-1778719182.jpeg', 'sec' => null, 'time' => '2026-05-14 00:39:42'],
            15 => ['main' => 'rugs/main_imges/rug-title-1778719196.jpeg', 'sec' => null, 'time' => '2026-05-14 00:39:56'],
            16 => ['main' => 'rugs/main_imges/rug-title-1778719823.jpg',  'sec' => 'rugs/second_images/rug-title-1778719824.jpg', 'time' => '2026-05-14 00:50:23'],
        ];

        // 3. إنشاء 16 منتج سجاد
        for ($i = 1; $i <= 23; $i++) {
            $title = "Handmade Moroccan Rug " . $i;
            $rug = Rugs::create([
                'id'              => $i,
                'rug_title'       => $title,
                'rug_slug'        => Str::slug($title) . '-' . $i,
                'rug_description' => $i.'Premium quality wool rug, handcrafted with traditional Berber patterns. Perfect for modern and classic interiors.',
                'rug_category'    => rand(1, 4),
                'rug_quantity'    => rand(5, 50),
                'rug_price'       => rand(400, 2500),
                'created_at'      => $specificImages[$i]['time'] ?? now(),
                'updated_at'      => $specificImages[$i]['time'] ?? now(),
            ]);

            // 4. ربط الصور بناءً على القائمة المحددة
            if (isset($specificImages[$i])) {
                Rugs_imges::create([
                    'rug_id'             => $rug->id,
                    'main_rug_path'      => $specificImages[$i]['main'],
                    'second_path_img'    => $specificImages[$i]['sec'],
                    'third_path_img'     => null,
                    'fourth_path_img'    => null,
                    'video_path'         => null,
                    'main_rug_file_size' => rand(15000, 30000), // حجم تقريبي بالبايت
                    'created_at'         => $specificImages[$i]['time'],
                    'updated_at'         => $specificImages[$i]['time'],
                ]);
            }
        }
    }
}
