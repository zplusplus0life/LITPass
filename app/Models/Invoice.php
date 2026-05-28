<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{

    protected $fillable = [
        'subscription_id',
        'invoice_number',
        'amount',
        'issued_at',
        'pdf_path',
    ]; 
    protected $casts = [
        'issued_at' => 'datetime'
    ];
}
