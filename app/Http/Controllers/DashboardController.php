<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {

        $user = $request->user();
        $activeSubs = null;
        $invoices = collect();
        $daysRemaining = 0;

        if ($user) {
            $activeSubs = $user->langganan()
            ->where('status', 'aktif')
            ->where('ends_at', '>', now())
            ->with('plan')
            ->first();

            if ($activeSubs) {
                $invoices = $activeSubs->invoices()->orderBy('issued_at', 'desc')->get();
                $daysRemaining = (int) ceil(now()->diffInHours($activeSubs->ends_at, false) / 24);
            }

            $purchasedBooks = Order::where('user_id', $user->id)
            ->with('book')
            ->latest()
            ->get();
        }

        return Inertia::render('dashboard', [
            'purchasedBooks' => $purchasedBooks ?? [],
            'activeSubscription' => $activesubs ? [
                'id' => $activeSubs->id,
                'starts_at' => $activeSubs->starts_at->toDateTimeString(),
                'ends_at' => $activeSubs->ends_at->format('d M Y'),
                'days_remaining' => $daysRemaining,
                'is_expired' => $daysRemaining <= 0,
                'status' => $activeSubs->status,
                'plan' => [
                    'nama' => $activeSubs->plan->nama,
                    'harga' => $activeSubs->plan->harga,
                    'deskripsi' => $activeSubs->plan->deskripsi,
                ],

            ] : null,
            'invoices' => $invoices->map(function ($invoice){
                return [
                    'id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'amount' => $invoice->amount,
                    'issued_at' => $invoice->issued_at->toDateTimeString(),
                    'pdf_path'  => $invoice->pdf_path,
                ];
            })
        ]);
    }
}
