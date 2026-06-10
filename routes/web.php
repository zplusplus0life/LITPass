<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;
use Laravel\Fortify\Features;
use App\Http\Controllers\BookController;

// USER NOT LOGIN
Route::get('/', function () {
    return redirect()->route('books.indeks');
});

Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show'); // books details info
Route::get('/plans', [PlanController::class, 'index'])->name('plans.index'); // plans page index


// group middleware for home button
Route::middleware('user')->group(function(){

// books page index
Route::get('/books', [BookController::class, 'index'])->name('books.indeks'); 

});


// --- GROUPING ROUTE USER SUDAH LOGIN --- 
Route::middleware(['auth', 'user'])->group(function(){

// dashboard user
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// spesific book buy
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

// plan buy
Route::post('plans/{plan}/subscribe', [PlanController::class, 'subscribe'])->name('plans.subscribe');

// download pdf invoice
Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'download'])->name('invoices.download');
});




// --- GROUPING ROUTE LOGIN AS ADMIN ---
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function (){
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    //plans management
    Route::resource('plans', PlanController::class);

    //books management
    Route::get('/books', [AdminController::class, 'books'])->name('books.index');
    Route::resource('books', AdminController::class)->except('index');

});