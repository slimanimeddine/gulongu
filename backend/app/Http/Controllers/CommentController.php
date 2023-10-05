<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Auth;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $fields = $request->validate([
                'content' => 'required|string',
                'chapter_id' => 'required|exists:chapters,id',
                'likes' => 'required|integer',
                'dislikes' => 'required|integer',
                'chapterSlug' => 'required|string',
            ]);

            $userId = Auth::id();

            $user = Auth::user();

            $comment = Comment::create([
                'content' => $fields['content'],
                'chapter_id' => $fields['chapter_id'],
                'likes' => $fields['likes'],
                'dislikes' => $fields['dislikes'],
                'chapterSlug' => $fields['chapterSlug'],
                'user_id' => $userId,
                'authorUsername' => $user->username
            ]);

            return response()->json([
                'comment' => $comment
            ], 200);
        }
    }

    /**
     * get novel's reviews.
     */
    public function getChaptersComments(string $chapterSlug, string $sort)
    {
        if ($sort == 'new') {
            $comments = Comment::where('chapterSlug', $chapterSlug)->latest()->get();
        }
        if ($sort == 'old') {
            $comments = Comment::where('chapterSlug', $chapterSlug)->oldest()->get();
        }
        if ($sort == 'top') {
            $comments = Comment::where('chapterSlug', $chapterSlug)->orderby('likes', 'desc')->get();
        }

        return response()->json([
            "comments" => $comments
        ], 200);
    }

    /**
     * add a like to a review
     */
    public function likeComment(string $commentId)
    {
        if (Auth::check()) {
            Comment::where('id', $commentId)->increment('likes');
        }
    }

    /**
     * add a dislike to a review
     */
    public function dislikeComment(string $commentId)
    {
        if (Auth::check()) {
            Comment::where('id', $commentId)->increment('dislikes');
        }
    }
}
