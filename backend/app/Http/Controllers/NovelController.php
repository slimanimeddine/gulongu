<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Novel;
use Illuminate\Http\Request;

class NovelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Novel::all();
        $novels = Novel::select('novels.*')
            ->selectRaw('COUNT(reviews.id) as totalReviews')
            ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
            ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
            ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
            ->groupBy(
                'novels.id',
                'novels.created_at',
                'novels.updated_at',
                'novels.title',
                'novels.slug',
                'novels.translator',
                'novels.synopsis',
                'novels.genres',
                'novels.numberOfChapters'
            )
            ->get();

        return response()->json($novels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $novel = Novel::find($id);

        return response()->json([
            'novel' => $novel,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Get novel by its slug
     */
    public function getNovelBySlug(string $slug)
    {
        //
        $novel = Novel::where('slug', $slug)
            ->select('novels.*')
            ->selectRaw('COUNT(reviews.id) as totalReviews')
            ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
            ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
            ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
            ->groupBy(
                'novels.id',
                'novels.created_at',
                'novels.updated_at',
                'novels.title',
                'novels.slug',
                'novels.translator',
                'novels.synopsis',
                'novels.genres',
                'novels.numberOfChapters'
            )
            ->first();


        return response()->json($novel);
    }

    /**
     * Get novel's chapters by its slug
     */
    public function getNovelsChapters(string $slug)
    {
        //
        $novelId = Novel::firstWhere('slug', $slug)->id;
        $selectedColumns = ['id', 'created_at', 'updated_at', 'title', 'novel_id', 'slug'];
        if ($novelId) {
            $chapters = Chapter::select($selectedColumns)->where('novel_id', $novelId)->get();
            return response()->json($chapters);
        } else {
            abort(404, 'Resource not found');
        }
    }

    /**
     * get all novels sorted based on sortBy
     */
    public function getNovelsSortedOrFiltered(string $sortBy, string $filter)
    {
        //
        if ($filter != "none") {
            $desiredGenres = explode(",", $filter);

            if ($sortBy === 'name') {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->filterByGenres($desiredGenres)
                    ->orderBy('title', 'asc')
                    ->get();

                return response()->json($novels);
            } else if ($sortBy === 'chapters') {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->filterByGenres($desiredGenres)
                    ->orderBy('numberOfChapters', 'desc')
                    ->get();

                return response()->json($novels);
            } else {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->filterByGenres($desiredGenres)
                    ->orderBy('recommendationRatio', 'desc')
                    ->get();
                return response()->json($novels);
            }
        } else {
            if ($sortBy === 'name') {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->orderBy('title', 'asc')
                    ->get();

                return response()->json($novels);
            } else if ($sortBy === 'chapters') {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->orderBy('numberOfChapters', 'desc')
                    ->get();

                return response()->json($novels);
            } else {
                $novels = Novel::select('novels.*')
                    ->selectRaw('COUNT(reviews.id) as totalReviews')
                    ->selectRaw('SUM(reviews.isRecommended) as totalRecommendations')
                    ->selectRaw('SUM(reviews.isRecommended) / COUNT(reviews.id) as recommendationRatio')
                    ->leftJoin('reviews', 'reviews.novel_id', '=', 'novels.id')
                    ->groupBy(
                        'novels.id',
                        'novels.created_at',
                        'novels.updated_at',
                        'novels.title',
                        'novels.slug',
                        'novels.translator',
                        'novels.synopsis',
                        'novels.genres',
                        'novels.numberOfChapters'
                    )
                    ->orderBy('recommendationRatio', 'desc')
                    ->get();
                return response()->json($novels);
            }
        }
    }
    /**
     * get all genres
     */
    public function getGenres()
    {
        //
        $genres = Novel::distinct()
            ->pluck('genres')
            ->filter()
            ->flatten()
            ->unique()
            ->values();

        // Transform the values into objects with numeric IDs
        $genreObjects = $genres->map(function ($genre, $index) {
            return ['id' => $index, 'name' => $genre];
        });

        return $genreObjects;
    }
}