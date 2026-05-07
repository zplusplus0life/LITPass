<?php

namespace App\Http\Controllers;

use App\Models\Plan;
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
}
