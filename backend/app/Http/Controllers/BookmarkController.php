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

            return response()->json($bookmark);
        } else {
            abort(403, 'not authorized');
        }
    }
    /**
     * get all user's booksmarks
     */
    public function getUserBookmarks(string $sortBy, string $order)
    {
        if (Auth::check()) {
            $userId = Auth::id();
            if ($sortBy == 'lastRead') {
                $bookmarks = Bookmark::where('user_id', $userId)->orderBy('chapterTitle', $order)->get();
                return response()->json($bookmarks);
            } else {
                $bookmarks = Bookmark::where('user_id', $userId)->orderBy('novelTitle', $order)->get();
                return response()->json($bookmarks);
            }
        } else {
            abort(403, 'not authorized');
        }
    }
    /**
     * get all user's booksmarks
     */
    public function removeBookmark(string $bookmarkId)
    {
        if (Auth::check()) {
            $userId = Auth::id();
            $bookmark = Bookmark::where('user_id', $userId)
                ->where('id', $bookmarkId)
                ->first();
            $bookmark->delete();
        } else {
            abort(403, 'not authorized');
        }
    }
}