<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index() 
    {
        $plans = Plan::all();
        return Inertia::render('Plans/index', [
            'plans' => $plans,
        ]);
    }
}
