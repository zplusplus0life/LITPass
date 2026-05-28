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
                $displayPrice = $book->harga * 0.8;
            }

            return [
                'id' => $book->id,
                'judul' => $book->judul,
                'penulis' => $book->penulis,
                'harga' => (float) $book->harga,
                'harga_member' => (float) ($book->harga * 0.8),
                'tampilan_harga' => (float) $displayPrice,
                'is_premium' => $book->is_premium,
                'cover_url' => $book->cover_url,
            ];
         });

            return Inertia::render('Books/index', [
                    'buku' => $books,
                    'langganan' => $hasSubs,
            ]);
    }

    public function show(Book $book)
    {
        $user = Auth::user();
        $hasSubs = $user ? $user->punyaAktifLangganan() : false;

        if(!$user){
            return redirect()->route('login')->with('error', 'You should login first.');
        }

        if ($book->is_premium && !$hasSubs){
            return redirect()->route('plans.index')->with('error', 'This book is exclusive for Book Club Members. Join now to unlock!');
        }

        return Inertia::render('Books/show',[
            'books' => [
                'id' => $book->id,
                'judul' => $book->judul,
                'penulis' => $book->penulis,
                'harga' => (float)$book->harga,
                'tampilan_harga' => $hasSubs ? (float)($book->harga * 0.8) : (float)$book->harga,
                'deskripsi' => $book->deskripsi,
                'cover_url' => $book->cover_url,
                'is_premium' => $book->is_premium,
            ],
            'langganan' => $hasSubs,
        ]);
    }
}
