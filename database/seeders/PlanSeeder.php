<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

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
            'deskripsi' => 'Telusuri buku yang umum.',
        ]);

        Plan::create([
            'nama' => 'Keanggotaan klub buku',
            'slug' => 'Pro',
            'harga' => 10000.00,
            'deskripsi' => 'Dapatkan potongan harga 20% untuk semua buku berbayar dan mengakses koleksi premium',
        ]);
    }
}
