<?php

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
Route::get('/novels/{id}', [NovelController::class, 'show']);

// get a chapter by its id
Route::get('/chapters/{id}', [ChapterController::class, 'show']);