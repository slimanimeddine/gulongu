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
        if ($novel) {
            $chapter = Chapter::where('novel_id', $novel->id)->where('slug', $chapter)->first();

            if ($chapter) {
                return response()->json([
                    'chapter' => $chapter,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'chapter with given slug was not found'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'novel with given slug was not found'
            ], 404);
        }
    }

    /**
     * get a novel's previous chapters
     */
    public function getNovelsPreviousChapter(string $novelSlug, string $chapterSlug)
    {
        //
        $novel = Novel::firstWhere('slug', $novelSlug);
        $chapter = Chapter::where('novel_id', $novel->id)->where('slug', $chapterSlug)->first();
        if ($chapter) {
            // Find the previous chapter
            $previousChapter = Chapter::where('novel_id', $novel->id)->where('id', '<', $chapter->id)->orderBy('id', 'desc')->first();

            if ($previousChapter) {
                // Do something with $previousChapter
                return response()->json([
                    'previousChapter' => $previousChapter,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'previous chapter was not found'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'chapter was not found'
            ], 404);
        }
    }

    /**
     * get a novel's next chapters
     */
    public function getNovelsNextChapter(string $novelSlug, string $chapterSlug)
    {
        //
        $novel = Novel::firstWhere('slug', $novelSlug);
        $chapter = Chapter::where('novel_id', $novel->id)->where('slug', $chapterSlug)->first();
        if ($chapter) {
            // Find the previous chapter
            $nextChapter = Chapter::where('novel_id', $novel->id)->where('id', '>', $chapter->id)->orderBy('id', 'asc')->first();

            if ($nextChapter) {
                // Do something with $nextChapter
                return response()->json([
                    'nextChapter' => $nextChapter,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'next chapter was not found'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'chapter was not found'
            ], 404);
        }
    }

    /**
     * get a novel's first chapter
     */
    public function getNovelsFirstChapter(string $novelSlug)
    {
        //
        $novel = Novel::firstWhere('slug', $novelSlug);
        $chapter = Chapter::where('novel_id', $novel->id)->orderBy('id', 'asc')->first();
        if ($chapter) {
            return response()->json([
                'firstChapter' => $chapter,
            ], 200);
        } else {
            return response()->json([
                'message' => 'chapter was not found'
            ], 404);
        }
    }
}