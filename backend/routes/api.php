<?php

use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentReplyController;
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

// get all novels
Route::get('/novels', [NovelController::class, 'index']);

// get all chapters
Route::get('/chapters', [ChapterController::class, 'index']);

// get a novel by its id
Route::get('/novels/{id}', [NovelController::class, 'show'])
    ->where('id', '[0-9]+');

// get a novel by its slug
Route::get('/novels/{slug}', [NovelController::class, 'getNovelBySlug']);

// get a chapter by its id
Route::get('/chapters/{id}', [ChapterController::class, 'show'])
    ->where('id', '[0-9]+');

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

// get all novels sorted based on sortBy
Route::get('/novels/{sortBy}/{filter}/sortorfilter', [NovelController::class, 'getNovelsSortedOrFiltered'])
    ->whereIn('sortBy', ['name', 'chapters', 'rating']);

// get all genres
Route::get('/genres', [NovelController::class, 'getGenres']);

// add a review
Route::middleware('auth:sanctum')->post('/reviews', [ReviewController::class, 'store']);

// add a review reply
Route::middleware('auth:sanctum')->post('/reviewReplies', [ReviewReplyController::class, 'store']);

// get novel's reviews
Route::get('/reviews/{novelSlug}/{sort}', [ReviewController::class, 'getNovelsReviews'])
    ->whereIn('sort', ['newest', 'oldest', 'best', 'worst']);

// get review's replies
Route::get('/reviewReplies/{reviewId}', [ReviewReplyController::class, 'getReviewsReplies'])
    ->where('reviewId', '[0-9]+');

// add a like to a review
Route::middleware('auth:sanctum')
    ->put('/reviews/{reviewId}/like', [ReviewController::class, 'likeReview'])
    ->where('reviewId', '[0-9]+');

// add a dislike to a review
Route::middleware('auth:sanctum')
    ->put('/reviews/{reviewId}/dislike', [ReviewController::class, 'dislikeReview'])
    ->where('reviewId', '[0-9]+');

// add a comment
Route::middleware('auth:sanctum')
    ->post('/comments', [CommentController::class, 'store']);

// add a comment reply
Route::middleware('auth:sanctum')
    ->post('/commentReplies', [CommentReplyController::class, 'store']);

// get chapter's comments
Route::get('/comments/{chapterSlug}/{sort}', [CommentController::class, 'getChaptersComments'])
    ->whereIn('sort', ['new', 'old', 'top']);

// get comment's replies
Route::get('/commentReplies/{commentId}', [CommentReplyController::class, 'getCommentsReplies'])
    ->where('commentId', '[0-9]+');

// add a like to a comment
Route::middleware('auth:sanctum')
    ->put('/comments/{commentId}/like', [CommentController::class, 'likeComment'])
    ->where('commentId', '[0-9]+');

// add a dislike to a comment
Route::middleware('auth:sanctum')
    ->put('/comments/{commentId}/dislike', [CommentController::class, 'dislikeComment'])
    ->where('commentId', '[0-9]+');

// add a like to a comment reply
Route::middleware('auth:sanctum')
    ->put('/commentReplies/{commentReplyId}/like', [CommentReplyController::class, 'likeCommentReply'])
    ->where('commentReplyId', '[0-9]+');

// add a dislike to a comment reply
Route::middleware('auth:sanctum')
    ->put('/commentsReplies/{commentReplyId}/dislike', [CommentReplyController::class, 'dislikeCommentReply'])
    ->where('commentReplyId', '[0-9]+');

// add a bookmark
Route::middleware('auth:sanctum')
    ->post('/bookmarks', [BookmarkController::class, 'store']);

// get all user's booksmarks
Route::middleware('auth:sanctum')
    ->get('/bookmarks/{sortBy}/{order}', [BookmarkController::class, 'getUserBookmarks'])
    ->whereIn('sortBy', ['lastRead', 'novelName'])
    ->whereIn('order', ['asc', 'desc']);

// remove a bookmark
Route::middleware('auth:sanctum')
    ->delete('/bookmarks/{bookmarkId}', [BookmarkController::class, 'removeBookmark'])
    ->where('bookmarkId', '[0-9]+');