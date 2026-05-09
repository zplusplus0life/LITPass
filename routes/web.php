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


Route::get('/', function () {
    return redirect()->route('books.indeks');
});

Route::get('/books', [BookController::class, 'index'])->name('books.indeks');

// --- kelompok route user biasa --- 
Route::middleware(['auth', 'user'])->group(function(){

Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

Route::post('plans/{plan}/subscribe', [PlanController::class, 'subscribe'])->name('plans.subscribe');

Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'download'])->name('invoices.download');


});




/* Route::middleware('auth')->group(function(){
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
}); */

Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');


Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function (){
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');

    //user management
    Route::resource('users', UserController::Class);

    //plans management
    Route::resource('plans', planController::class);

    //books management
    Route::get('/books', [AdminController::class, 'books'])->name('books.index');
    Route::resource('books', AdminController::class)->except(['index', 'show']);

});