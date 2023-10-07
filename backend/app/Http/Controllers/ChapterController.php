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
                return response()->json($chapter);
            } else {
                abort(404, "Chapter not found!");
            }
        } else {
                abort(404, "Novel not found!");
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
        $selectedColumns = ['id', 'created_at', 'updated_at', 'title', 'novel_id', 'slug'];
        if ($chapter) {
            $previousChapter = Chapter::select($selectedColumns)->where('novel_id', $novel->id)->where('id', '<', $chapter->id)->orderBy('id', 'desc')->first();

            if ($previousChapter) {
                return response()->json($previousChapter);
            } else {
                abort(404, "Previous chapter not found!");
            }
        } else {
                abort(404, "Chapter not found!");
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
        $selectedColumns = ['id', 'created_at', 'updated_at', 'title', 'novel_id', 'slug'];
        if ($chapter) {
            $nextChapter = Chapter::select($selectedColumns)->where('novel_id', $novel->id)->where('id', '>', $chapter->id)->orderBy('id', 'asc')->first();

            if ($nextChapter) {
                return response()->json($nextChapter);
            } else {
                abort(404, "Next chapter not found!");
            }
        } else {
            abort(404, "Chapter not found!");
        }
    }

    /**
     * get a novel's first chapter
     */
    public function getNovelsFirstChapter(string $novelSlug)
    {
        //
        $novel = Novel::firstWhere('slug', $novelSlug);
        $selectedColumns = ['id', 'created_at', 'updated_at', 'title', 'novel_id', 'slug'];
        $chapter = Chapter::select($selectedColumns)->where('novel_id', $novel->id)->orderBy('id', 'asc')->first();
        if ($chapter) {
            return response()->json($chapter);
        } else {
            abort(404, "Chapter not found!");
        }
    }
}