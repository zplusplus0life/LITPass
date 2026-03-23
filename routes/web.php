<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BookController;


Route::get('/', function () {
    return redirect()->route('books.indeks');
});

Route::get('/books', [BookController::class, 'index'])->name('books.indeks');