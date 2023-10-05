<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Comment::class;

    public function definition(): array
    {
        // Get a random user's username from the users table
        $user = User::inRandomOrder()->first();
        $chapter = Chapter::inRandomOrder()->first();
        $content = $this->faker->realText(1000); // Generate longer content

        return [
            'chapter_id' => $chapter->id,
            'user_id' => $user->id,
            'content' => $content,
            'likes' => $this->faker->numberBetween(0, 100),
            'dislikes' => $this->faker->numberBetween(0, 100),
            'authorUsername' => $user->username,
            'chapterSlug' => $chapter->slug,
        ];
    }
}