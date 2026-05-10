<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Subscription;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PlanController extends Controller
{
    public function index() 
    {
        $user = Auth::user();
        $plans = Plan::all();

        if ($user && $user->role === 'admin'){
            return Inertia::render('Admin/Plans/Index', [
                'plans' => $plans,
            ]);
        }

        return Inertia::render('Plans/index', [
            'plans' => $plans,
        ]);
    }

    public function subscribe( Plan $plan, InvoiceController $invoiceController){

        $user = Auth::user();

         if ($user->punyaAktifLangganan()) {
            return redirect()->route('dashboard')->with('error', 'You already have an active subscription.');
         }

        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'starts_at' => now(),
            'ends_at' => now()->addMonth(),
            'status' => 'aktif',
        ]);

        $invoiceController->generateAndStore($subscription);

          return redirect()->route('dashboard')->with('success', 'You have successfully subscribed to the ' . $plan->name . ' plan!');
    }
}
