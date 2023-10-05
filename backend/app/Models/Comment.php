<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'chapter_id',
        'user_id',
        'content',
        'likes',
        'dislikes',
        'authorUsername',
        'chapterSlug',
    ];
    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function commentReplies(): HasMany
    {
        return $this->hasMany(CommentReply::class);
    }
}
