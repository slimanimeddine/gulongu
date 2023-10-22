<?php

namespace Database\Seeders;

use App\Models\Chapter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $now = DB::raw('CURRENT_TIMESTAMP');
        DB::table('chapters')->insert([
            ['title' => 'Chapter 1 A Meeting of Legends', 'novel_id' => 4, 'slug' => 'chapter-1-a-meeting-of-legends', 'content' => Chapter::getChapterContent('7-killers', 'chapter-1-a-meeting-of-legends'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 2 - Injury Of The Self-Inflicted Nature', 'novel_id' => 4, 'slug' => 'chapter-2-injury-of-the-self-inflicted-nature', 'content' => Chapter::getChapterContent('7-killers', 'chapter-2-injury-of-the-self-inflicted-nature'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 3 - Yue'er Shining On Changjie", 'novel_id' => 4, 'slug' => 'chapter-3-yueer-shining-on-changjie', 'content' => Chapter::getChapterContent('7-killers', 'chapter-3-yueer-shining-on-changjie'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 4 - Inhuman People', 'novel_id' => 4, 'slug' => 'chapter-4-inhuman-people', 'content' => Chapter::getChapterContent('7-killers', 'chapter-4-inhuman-people'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 5 Lovesickness Will Make You Grow Old', 'novel_id' => 4, 'slug' => 'chapter-5-lovesickness-will-make-you-grow-old', 'content' => Chapter::getChapterContent('7-killers', 'chapter-5-lovesickness-will-make-you-grow-old'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 6 A Dragon Amongst Men', 'novel_id' => 4, 'slug' => 'chapter-6-a-dragon-amongst-men', 'content' => Chapter::getChapterContent('7-killers', 'chapter-6-a-dragon-amongst-men'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 7 Capturing the dragon empty handed', 'novel_id' => 4, 'slug' => 'chapter-7-capturing-the-dragon-empty-handed', 'content' => Chapter::getChapterContent('7-killers', 'chapter-7-capturing-the-dragon-empty-handed'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 8 Heaven’s Net Is Wide Meshed, Nothing Escapes It', 'novel_id' => 4, 'slug' => 'chapter-8-heavens-net-is-wide-meshed-nothing-escapes-it', 'content' => Chapter::getChapterContent('7-killers', 'chapter-8-heavens-net-is-wide-meshed-nothing-escapes-it'), 'updated_at' => $now, 'created_at' => $now],
        ]);
    }
}