<?php

namespace Database\Factories;

use App\Models\Novel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Review;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Review::class;

    public function definition(): array
    {
        // Get a random user's username from the users table
        $user = User::inRandomOrder()->first();
        $novel = Novel::inRandomOrder()->first();
        $content = $this->faker->realText(1000); // Generate longer content

        return [
            'novel_id' => $novel->id,
            'user_id' => $user->id,
            'isRecommended' => $this->faker->boolean,
            'content' => $content,
            'likes' => $this->faker->numberBetween(0, 100),
            'dislikes' => $this->faker->numberBetween(0, 100),
            'authorUsername' => $user->username,
            'novelSlug' => $novel->slug,
            'numberOfReplies' => 0
        ];
    }
}