<?php

namespace App\Http\Controllers;

use App\Models\CommentReply;
use Auth;
use Illuminate\Http\Request;

class CommentReplyController extends Controller
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
                'comment_id' => 'required|exists:comments,id',
                'likes' => 'required|integer',
                'dislikes' => 'required|integer',
            ]);

            $userId = Auth::id();

            $user = Auth::user();

            $commentReply = CommentReply::create([
                'content' => $fields['content'],
                'comment_id' => $fields['comment_id'],
                'user_id' => $userId,
                'authorUsername' => $user->username,
                'likes' => $fields['likes'],
                'dislikes' => $fields['dislikes']
            ]);

            return response()->json($commentReply);
        }
    }
    /**
     * get comment's replies
     */
    public function getCommentsReplies(string $commentId)
    {
        $commentReplies = CommentReply::where('comment_id', $commentId)->get();
        return response()->json($commentReplies);
    }

    /**
     * add a like to a review
     */
    public function likeCommentReply(string $commentReplyId)
    {
        if (Auth::check()) {
            CommentReply::where('id', $commentReplyId)->increment('likes');
        }
    }

    /**
     * add a dislike to a review
     */
    public function dislikeCommentReply(string $commentReplyId)
    {
        if (Auth::check()) {
            CommentReply::where('id', $commentReplyId)->increment('dislikes');
        }
    }
}
