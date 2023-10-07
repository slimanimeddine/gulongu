<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $fields = $request->validate([
                'content' => 'required|string|minWords',
                'novel_id' => 'required|exists:novels,id',
                'isRecommended' => 'required|boolean',
                'likes' => 'required|integer',
                'dislikes' => 'required|integer',
                'novelSlug' => 'required|string',
                'numberOfReplies' => 'required|integer',
            ]);

            $userId = Auth::id();

            $user = Auth::user();

            $review = Review::create([
                'content' => $fields['content'],
                'novel_id' => $fields['novel_id'],
                'isRecommended' => $fields['isRecommended'],
                'likes' => $fields['likes'],
                'dislikes' => $fields['dislikes'],
                'numberOfReplies' => $fields['numberOfReplies'],
                'novelSlug' => $fields['novelSlug'],
                'user_id' => $userId,
                'authorUsername' => $user->username
            ]);

            return response()->json([
                'review' => $review
            ], 200);
        }
    }

    /**
     * get novel's reviews.
     */
    public function getNovelsReviews(string $novelSlug, string $sort)
    {
        if ($sort == 'newest') {
            $reviews = Review::where('novelSlug', $novelSlug)->latest()->get();
            return response()->json($reviews);
        }
        else if ($sort == 'oldest') {
            $reviews = Review::where('novelSlug', $novelSlug)->oldest()->get();
            return response()->json($reviews);
        } else if ($sort == 'best') {
            $reviews = Review::where('novelSlug', $novelSlug)->orderBy('likes', 'desc')->get();
            return response()->json($reviews);
        } else {
            $reviews = Review::where('novelSlug', $novelSlug)->orderBy('dislikes', 'desc')->get();
            return response()->json($reviews);
        }
    }

    /**
     * add a like to a review
     */
    public function likeReview(string $reviewId)
    {
        if (Auth::check()) {
            Review::where('id', $reviewId)->increment('likes');
        }
    }

    /**
     * add a dislike to a review
     */
    public function dislikeReview(string $reviewId)
    {
        if (Auth::check()) {
            Review::where('id', $reviewId)->increment('dislikes');
        }
    }
}