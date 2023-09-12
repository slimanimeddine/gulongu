<?php

namespace App\Http\Controllers;

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
                'content' => 'required|string|minWords',
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

            return response()->json(['message' => 'review reply added successfully', 'review' => $reviewReply], 200);
        }
    }
}
