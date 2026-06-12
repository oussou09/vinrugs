<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminsSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            [
                'fullname' => 'Anrea perlo',
                'email' => 'admin1@vintagerugs.com',
                'password' => Hash::make('admin123')
            ],
            [
                'fullname' => 'Anrea robertson',
                'email' => 'admin2@vintagerugs.com',
                'password' => Hash::make('admin123')
            ],
            [
                'fullname' => 'Anrea cafu',
                'email' => 'admin3@vintagerugs.com',
                'password' => Hash::make('admin123')
            ],
        ]);
    }
}
