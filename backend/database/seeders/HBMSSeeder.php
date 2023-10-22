<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chapter;
use Illuminate\Support\Facades\DB;

class HBMSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $now = DB::raw('CURRENT_TIMESTAMP');
        DB::table('chapters')->insert([
            ['title' => 'Prologue', 'novel_id' => 2, 'slug' => 'prologue', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'prologue'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 1 - The Man at the Horizon', 'novel_id' => 2, 'slug' => 'chapter-1-the-man-at-the-horizon', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-1-the-man-at-the-horizon'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 2 - Wild Rose at the Horizon', 'novel_id' => 2, 'slug' => 'chapter-2-wild-rose-at-the-horizon', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-2-wild-rose-at-the-horizon'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 3 - Bright Moon at the High Mansion', 'novel_id' => 2, 'slug' => 'chapter-3-bright-moon-at-the-high-mansion', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-3-bright-moon-at-the-high-mansion'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 4 - The Thumb of the Black Hand', 'novel_id' => 2, 'slug' => 'chapter-4-the-thumb-of-the-black-hand', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-4-the-thumb-of-the-black-hand'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 5 - Peacock', 'novel_id' => 2, 'slug' => 'chapter-5-peacock', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-5-peacock'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 6 - Before the Duel', 'novel_id' => 2, 'slug' => 'chapter-6-before-the-duel', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-6-before-the-duel'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 7 - The Duel', 'novel_id' => 2, 'slug' => 'chapter-7-the-duel', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-7-the-duel'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 8 - Peacock Manor', 'novel_id' => 2, 'slug' => 'chapter-8-peacock-manor', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-8-peacock-manor'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 9 - Betting One's Life on a Single Sabre", 'novel_id' => 2, 'slug' => 'chapter-9-betting-ones-life-on-a-single-sabre', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-9-betting-ones-life-on-a-single-sabre'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 10 - Changes', 'novel_id' => 2, 'slug' => 'chapter-10-changes', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-10-changes'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 11 - Where Did the Bright Moon Go?', 'novel_id' => 2, 'slug' => 'chapter-11-where-did-the-bright-moon-go', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-11-where-did-the-bright-moon-go'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 12 - Between Life and Death', 'novel_id' => 2, 'slug' => 'chapter-12-between-life-and-death', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-12-between-life-and-death'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 13 - Demon Decapitating Sabre of Heaven's Monarch", 'novel_id' => 2, 'slug' => 'chapter-13-demon-decapitating-sabre-of-heavens-monarch', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-13-demon-decapitating-sabre-of-heavens-monarch'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 14 - First Pay, Then Kill', 'novel_id' => 2, 'slug' => 'chapter-14-first-pay-then-kill', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-14-first-pay-then-kill'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 15 - The Ancient Monastery of the Celestial Dragon', 'novel_id' => 2, 'slug' => 'chapter-15-the-ancient-monastery-of-the-celestial-dragon', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-15-the-ancient-monastery-of-the-celestial-dragon'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 16 - Funeral Bell', 'novel_id' => 2, 'slug' => 'chapter-16-funeral-bell', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-16-funeral-bell'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 17 - Despair', 'novel_id' => 2, 'slug' => 'chapter-17-despair', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-17-despair'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 18 - When Affection Begins to Thicken, Affection Turns Flimsy', 'novel_id' => 2, 'slug' => 'chapter-18-when-affection-begins-to-thicken-affection-turns-flimsy', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-18-when-affection-begins-to-thicken-affection-turns-flimsy'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 19 - Executioner', 'novel_id' => 2, 'slug' => 'chapter-19-executioner', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-19-executioner'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 20 - The Grandmaster and the Zither-Playing Servant', 'novel_id' => 2, 'slug' => 'chapter-20-the-grandmaster-and-the-zither-playing-servant', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-20-the-grandmaster-and-the-zither-playing-servant'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 21 - Emerging From the Cage', 'novel_id' => 2, 'slug' => 'chapter-21-emerging-from-the-cage', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-21-emerging-from-the-cage'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 22 - Gongzi Yu', 'novel_id' => 2, 'slug' => 'chapter-22-gongzi-yu', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-22-gongzi-yu'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 23 - Mysterious Old Man', 'novel_id' => 2, 'slug' => 'chapter-23-mysterious-old-man', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-23-mysterious-old-man'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 24 - The Last Battle', 'novel_id' => 2, 'slug' => 'chapter-24-the-last-battle', 'content' => Chapter::getChapterContent('horizon-bright-moon-sabre', 'chapter-24-the-last-battle'), 'updated_at' => $now, 'created_at' => $now],
        ]);
    }
}