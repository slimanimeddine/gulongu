<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Novel extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'translator',
        'slug',
        'synopsis',
        'genres'
    ];

    public $casts = [
        'genres' => 'array',
    ];

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    public function scopeFilterByGenres($query, array $desiredGenres)
    {
        return $query->where(function ($query) use ($desiredGenres) {
            foreach ($desiredGenres as $genre) {
                $query->whereJsonContains('genres', $genre);
            }
        });
    }
}
