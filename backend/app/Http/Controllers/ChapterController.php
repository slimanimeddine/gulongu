<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Novel;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Chapter::all();
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
        $chapter = Chapter::find($id);
        
        return response()->json([
            'chapter' => $chapter,
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
     * Get novel's specific chapter
     */
    public function getNovelsChapter(string $novel, string $chapter)
    {
        //
        $novel = Novel::firstWhere('slug', $novel);
        $chapter = Chapter::firstWhere('slug', $chapter);
        if ($chapter->novel_id !== $novel->id) {
            return response()->json([
                'message' => 'wrong novel'
            ], 404);
        }

        return response()->json([
            'chapter' => $chapter,
        ], 200);
    }
}
