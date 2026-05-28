<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use App\Models\Book;
use App\Models\Plan;
use App\Models\Subscription;
use Tests\TestCase;

class OrderDiscountTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_with_active_subscription_get_20_percent_discount(): void
    {
        $user = User::factory()->create();

        $plan = Plan::create([
            'nama' => 'Pro Plan',
            'slug' => 'pro',
            'harga' => 50000,
            'deskripsi' => 'test plan',
        ]);

        Subscription::create([
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'starts_at' => now(),
        'ends_at' => now()->addMonth(),
        'status' => 'aktif',
        ]);

        $book = Book::create([
        'judul' => 'Testing guide',
        'penulis' => 'me',
        'harga' => 100000,
        'is_premium' => false,
        ]);

        $res = $this->actingAs($user)
        ->post(route('orders.store'), [
            'book_id' => $book->id,
        ]);

        $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
        'book_id' => $book->id,
        'harga_ori' => 100000,
        'diskon' => 20000,
        'total_biaya' => 80000,
        ]);

        $res->assertRedirect(route('dashboard'));
    }
}
