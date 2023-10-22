<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chapter;
use Illuminate\Support\Facades\DB;

class HSNTSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $now = DB::raw('CURRENT_TIMESTAMP');
        DB::table('chapters')->insert([
            ['title' => 'Heroes Shed No Tears - Prologue', 'novel_id' => 3, 'slug' => 'heroes-shed-no-tears-prologue', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'heroes-shed-no-tears-prologue'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 1 - A Solitary Box', 'novel_id' => 3, 'slug' => 'chapter-1-a-solitary-box', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-1-a-solitary-box'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 2 - An Important Head', 'novel_id' => 3, 'slug' => 'chapter-2-an-important-head', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-2-an-important-head'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 3 - Surprise Attack', 'novel_id' => 3, 'slug' => 'chapter-3-surprise-attack', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-3-surprise-attack'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 4 - An Extraordinary Person, An Extraordinary Place, Extraordinary Things', 'novel_id' => 3, 'slug' => 'chapter-4-an-extraordinary-person-an-extraordinary-place-extraordinary-things', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-4-an-extraordinary-person-an-extraordinary-place-extraordinary-things'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 5: Extraordinary Meetings, Extraordinary Adventures', 'novel_id' => 3, 'slug' => 'chapter-5-extraordinary-meetings-extraordinary-adventures', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-5-extraordinary-meetings-extraordinary-adventures'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 6 - Seven Story Buddhist Pagoda', 'novel_id' => 3, 'slug' => 'chapter-6-seven-story-buddhist-pagoda', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-6-seven-story-buddhist-pagoda'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 7 - The Lion Clan Hall Of Copper Camel Alley', 'novel_id' => 3, 'slug' => 'chapter-7-the-lion-clan-hall-of-copper-camel-alley', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-7-the-lion-clan-hall-of-copper-camel-alley'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 8 - No Turning Back', 'novel_id' => 3, 'slug' => 'chapter-8-no-turning-back', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-8-no-turning-back'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 9 - Die Wu', 'novel_id' => 3, 'slug' => 'chapter-9-die-wu', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-9-die-wu'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 10 - The Second Month Is Too Early For Spring In Luoyang', 'novel_id' => 3, 'slug' => 'chapter-10-the-second-month-is-too-early-for-spring-in-luoyang', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-10-the-second-month-is-too-early-for-spring-in-luoyang'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 11 - Eighty-Eight Slain', 'novel_id' => 3, 'slug' => 'chapter-11-eighty-eight-slain', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-11-eighty-eight-slain'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 12: Even Just A Dance Can Overwhelm Emotions', 'novel_id' => 3, 'slug' => 'chapter-12-even-just-a-dance-can-overwhelm-emotions', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-12-even-just-a-dance-can-overwhelm-emotions'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 13: Slaughterhouse', 'novel_id' => 3, 'slug' => 'chapter-13-slaughterhouse', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-13-slaughterhouse'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 14: Who Is An Animal?', 'novel_id' => 3, 'slug' => 'chapter-14-who-is-an-animal', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-14-who-is-an-animal'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 15: Summit', 'novel_id' => 3, 'slug' => 'chapter-15-summit', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-15-summit'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 16: It’s Lonely At The Top', 'novel_id' => 3, 'slug' => 'chapter-16-its-lonely-at-the-top', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-16-its-lonely-at-the-top'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 17: The Cold Aura Of A Sword', 'novel_id' => 3, 'slug' => 'chapter-17-the-cold-aura-of-a-sword', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-17-the-cold-aura-of-a-sword'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 18: Heroes Never Die', 'novel_id' => 3, 'slug' => 'chapter-18-heroes-never-die', 'content' => Chapter::getChapterContent('heroes-shed-no-tears', 'chapter-18-heroes-never-die'), 'updated_at' => $now, 'created_at' => $now],
        ]);
    }
}