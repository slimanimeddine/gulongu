<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chapter extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'novel_id',
        'slug',
        'content'
    ];
    public function novel(): BelongsTo
    {
        return $this->belongsTo(Novel::class);
    }

    public static function getChapterContent($directory, $fileName) {
        $path = resource_path("{$directory}/{$fileName}");
        return file_get_contents($path);
    }
}