<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use App\Models\Book;
use Tests\TestCase;

class PremiumBookAccessTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_not_have_subscription_not_allowed_acces_premium_resource(): void
    {
        $user = User::factory()->create();

        $book = Book::create([
        'judul' => 'Testing guide',
        'penulis' => 'me',
        'harga' => 100000,
        'is_premium' => true,
        ]);

        $res = $this->actingAs($user)
        ->from(route('books.show', $book->id))->post(route('orders.store'), ['book_id' => $book->id]);

        $this->assertDatabaseMissing('orders', [
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        $res->assertRedirect(route('books.show', $book->id));
        $res->assertSessionHas('error', 'You must be a Book Club Member to buy this book.');
    }
}
