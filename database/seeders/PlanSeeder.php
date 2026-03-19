<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'nama' => 'Baca Gratis',
            'slug' => 'Gratis',
            'harga' => 0.00,
            'deskripsi' => 'Telusuri buku yang umum dan bayar di harga wajar.',
        ]);

        Plan::create([
            'nama' => 'Keanggotaan klub buku',
            'slug' => 'pro',
            'harga' => 10000.00,
            'deskripsi' => 'Dapatkan potongan harga 20% untuk semua buku berbayar dan mengakses koleksi premium',
        ]);
    }
}
