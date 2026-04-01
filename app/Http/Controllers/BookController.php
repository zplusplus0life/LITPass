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
         $books = Book::all();
 if ($user && $user->punyaAktifLangganan() == $user->id ){
 $books->transform(function ($buku){
    $hasil = $buku->harga * 0.8 ;
        return $hasil;
 });
 }
         
 return Inertia::render('Books/index', [
 'buku' => $books,
 ]);

    }
}
