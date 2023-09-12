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
            ]);

            $userId = Auth::id();

            $user = Auth::user();

            $review = Review::create([
                'content' => $fields['content'],
                'novel_id' => $fields['novel_id'],
                'isRecommended' => $fields['isRecommended'],
                'likes' => $fields['likes'],
                'dislikes' => $fields['dislikes'],
                'user_id' => $userId,
                'authorUsername' => $user->username
            ]);

            return response()->json([
                'message' => 'review added successfully', 
                'review' => $review
            ], 200);
        }
    }
}