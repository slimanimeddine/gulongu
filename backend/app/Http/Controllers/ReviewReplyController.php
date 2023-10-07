<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReviewReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewReplyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $fields = $request->validate([
                'content' => 'required|string',
                'review_id' => 'required|exists:reviews,id',
            ]);

            $userId = Auth::id();

            $user = Auth::user();

            $reviewReply = ReviewReply::create([
                'content' => $fields['content'],
                'review_id' => $fields['review_id'],
                'user_id' => $userId,
                'authorUsername' => $user->username
            ]);

            $reviewId = $fields['review_id'];
            Review::where('id', $reviewId)->increment('numberOfReplies');

            return response()->json([
                'reviewReply' => $reviewReply
            ], 200);
        }
    }

    /**
     * get review's replies
     */
    public function getReviewsReplies(string $reviewId)
    {
        $reviewReplies = ReviewReply::where('review_id', $reviewId)->get();
        return response()->json($reviewReplies);
    }
}