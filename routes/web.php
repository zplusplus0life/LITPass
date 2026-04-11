<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\DashboardController;
use Laravel\Fortify\Features;
use App\Http\Controllers\BookController;


Route::get('/', function () {
    return redirect()->route('books.indeks');
});

Route::get('/books', [BookController::class, 'index'])->name('books.indeks');

Route::get('/dashboard', [DashboardController::class, 'index'])
->name('dashboard');

Route::get('/plans', [PlansConroller::class, 'index'])->name('plans.index');