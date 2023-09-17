<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;

class NovelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Novel::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $novel = Novel::find($id);
        $chapters = $novel->chapters;
        
        return response()->json([
            'novel' => $novel,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Get novel by its slug
     */
    public function getNovelBySlug(string $slug)
    {
        //
        $novel = Novel::firstWhere('slug', $slug);
                
        return response()->json([
            'novel' => $novel,
        ], 200);
    }

    /**
     * Get novel's chapters by its slug
     */
    public function getNovelsChapters(string $slug)
    {
        //
        $novel = Novel::firstWhere('slug', $slug);
        $chapters = $novel->chapters->map(function ($chapter) {
            return [
                'id' => $chapter->id,
                'title' => $chapter->title,
                'slug' => $chapter->slug,
                'created_at' => $chapter->created_at->format('Y-m-d')
            ];
        });
                
        return response()->json([
            'chapters' => $chapters,
        ], 200);
    }
}
