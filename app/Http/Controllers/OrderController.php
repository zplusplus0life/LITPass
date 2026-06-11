<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Create New Order
     *
     * Membuat pesanan buku baru.
     * 
     * @group Order API
     * @authenticated
     */
    public function store(Request $request){

        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $user = Auth::user();
        $book = Book::findOrFail($request->book_id);

        if ($book->is_premium && !$user->punyaAktifLangganan()) {
            return back()->with('error', 'You must be a Book Club Member to buy this book.');
        }

        $originalPrice = $book->harga;
        $discountAmount = 0;

        if ($user->punyaAktifLangganan()) {
            $discountAmount = $originalPrice * 0.2;
        }

        $totalPrice = $originalPrice - $discountAmount;

        Order::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'harga_ori' => $originalPrice,
            'diskon' => $discountAmount,
            'total_biaya' => $totalPrice,
            'status' => 'completed',
        ]);

        return redirect()->route('dashboard')->with('success', "Success! You bought '{$book->judul}' for Rp" . number_format($totalPrice, 2));
    }
}
