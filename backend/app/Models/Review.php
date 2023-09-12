<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'novel_id',
        'user_id',
        'isRecommended',
        'content',
        'likes',
        'dislikes',
        'authorUsername'
    ];
    public function novel(): BelongsTo
    {
        return $this->belongsTo(Novel::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function reviewReplies(): HasMany
    {
        return $this->hasMany(ReviewReply::class);
    }
}
