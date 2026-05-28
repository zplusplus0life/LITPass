<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Book;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Inertia::render('Admin/Dashboard');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
        {
            return Inertia::render('Admin/Books/Create');
        }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
        {
            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'penulis' => 'required|string|max:255',
                'harga' => 'required|numeric|min:0',
                'deskripsi' => 'required|string',
                'cover_url' => 'required|url',
                'is_premium' => 'required|boolean',
            ]);

            Book::create($validated);

            return redirect()->route('admin.books.index')->with('success', 'Book created successfully.');
        }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
        {
            return Inertia::render('Admin/Books/Edit', [
                'book' => $book,
            ]);
        }

    /**
     * Update the specified resource in storage.
     */
     public function update(Request $request, Book $book)
        {
            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'penulis' => 'required|string|max:255',
                'harga' => 'required|numeric|min:0',
                'deskripsi' => 'required|string',
                'cover_url' => 'required|url',
                'is_premium' => 'required|boolean',
            ]);

            $book->update($validated);

            return redirect()->route('admin.books.index')->with('success', 'Book updated successfully.');
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
        {
            $book->delete();

            return redirect()->route('admin.books.index')->with('success', 'Book deleted successfully.');
        }

    public function books()
    {
        $books = \App\Models\Book::all();
        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
        ]);
    }
}
