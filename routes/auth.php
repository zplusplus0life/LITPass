<?php


use Illuminate\Support\Facades\Route;




Route::middleware('guest')->gruop(function () {

    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');

    Route::get('login', [AuthSessionController::class, 'create'])->name('login');
});