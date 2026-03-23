<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Plan;
use App\Models\Book;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        Book::truncate();
        Plan::truncate();
        User::truncate();

        $this->call(PlanSeeder::class);

        \App\Models\Book::factory(20)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
