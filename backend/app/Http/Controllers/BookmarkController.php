<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Auth;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    //
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        if (Auth::check()) {
            $fields = $request->validate([
                'novelTitle' => 'required|exists:novels,title',
                'novelSlug' => 'required|exists:novels,slug',
                'chapterTitle' => 'required|exists:chapters,title',
                'chapterSlug' => 'required|exists:chapters,slug',
            ]);

            $userId = Auth::id();
            $bookmark = Bookmark::updateOrCreate(
                ['novelTitle' => $fields['novelTitle'], 'novelSlug' => $fields['novelSlug'], 'user_id' => $userId],
                ['chapterTitle' => $fields['chapterTitle'], 'chapterSlug' => $fields['chapterSlug']]
            );

            return response()->json([
                'bookmark' => $bookmark
            ], 200);
        }
    }
    /**
     * get all user's booksmarks
     */
    public function getUserBookmarks(string $userId)
    {
        $bookmarks = Bookmark::where('user_id', $userId)->get();
        return response()->json([
            'bookmarks' => $bookmarks
        ]);
    }
}