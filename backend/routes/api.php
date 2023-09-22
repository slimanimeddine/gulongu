<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewReplyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// add a review
Route::middleware('auth:sanctum')->post('/reviews', [ReviewController::class, 'store']);

// add a review reply
Route::middleware('auth:sanctum')->post('/reviewReplies', [ReviewReplyController::class, 'store']);

// get all novels
Route::get('/novels', [NovelController::class, 'index']);

// get all chapters
Route::get('/chapters', [ChapterController::class, 'index']);

// get a novel by its id
Route::get('/novels/{id}', [NovelController::class, 'show'])->where('id', '[0-9]+');

// get a novel by its slug
Route::get('/novels/{slug}', [NovelController::class, 'getNovelBySlug']);

// get a chapter by its id
Route::get('/chapters/{id}', [ChapterController::class, 'show'])->where('id', '[0-9]+');

// get a novel's chapters by its slug
Route::get('/novels/{slug}/chapters', [NovelController::class, 'getNovelsChapters']);

// get a novel's specific chapter
Route::get('/novels/{novel}/chapters/{chapter}', [ChapterController::class, 'getNovelsChapter']);

//get a novel's previous chapter
Route::get('/novels/{novelSlug}/chapters/{chapterSlug}/previous', [ChapterController::class, 'getNovelsPreviousChapter']);

//get a novel's next chapter
Route::get('/novels/{novelSlug}/chapters/{chapterSlug}/next', [ChapterController::class, 'getNovelsNextChapter']);

//get a novel's first chapter
Route::get('/novels/{novelSlug}/first', [ChapterController::class, 'getNovelsFirstChapter']);