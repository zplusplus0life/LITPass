<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => fake()->sentence(3),
            'penulis' => fake()->name(),
            'harga' => fake()->randomFloat(2,10000,10000000),
            'deskripsi' => fake()->paragraph(),
            'cover_url' => 'https://picsum.photos/seed/' . fake()->word . '/400/600',
            'is_premium' => fake()->boolean(20),
        ];
    }
}
