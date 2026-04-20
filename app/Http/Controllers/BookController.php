<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
         $user = Auth::user();
         $hasSubs = $user ? $user->punyaAktifLangganan() : false;

         $books = Book::all()->map(function ($book) use ($hasSubs) {

            $displayPrice = $book->harga;
            if($hasSubs){
                $displayPrice = $book->price * 0.8;
            }

            return [
                'id' => $book->id,
                'judul' => $book->judul,
                'penulis' => $book->penulis,
                'harga' => (float) $book->harga,
                'harga_member' => (float) ($book->harga * 0.8),
                'tampil_harga' => (float) $displayPrice,
                'is_premium' => $book->is_premium,
                'cover_url' => $book->cover_url,
            ];
         });

 
         
 return Inertia::render('Books/index', [
 'buku' => $books,
 'langganan' => $hasSubs,
 ]);

    }
}
