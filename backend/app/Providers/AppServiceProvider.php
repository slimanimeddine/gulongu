<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Validator::extend('minWords', function ($attribute, $value, $parameters, $validator) {
            // Split the content into words
            $wordCount = str_word_count($value);

            // Check if the word count is greater than or equal to 100
            return $wordCount >= 100;
        });
    }
}