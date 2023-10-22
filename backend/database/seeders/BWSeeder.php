<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chapter;
use Illuminate\Support\Facades\DB;

class BWSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $now = DB::raw('CURRENT_TIMESTAMP');
        DB::table('chapters')->insert([
            ['title' => 'Prologue - Red Snow', 'novel_id' => 1, 'slug' => 'red-snow', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'red-snow'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 1 - One Who Doesn't Carry A Blade", 'novel_id' => 1, 'slug' => 'one-who-doesnt-carry-a-blade', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'one-who-doesnt-carry-a-blade'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 2 - GuanDong Hall of Ten-Thousand Horses', 'novel_id' => 1, 'slug' => 'guandong-hall-of-ten-thousand-horses', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'guandong-hall-of-ten-thousand-horses'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 3 - Sabres Are Severed, Intestines Are Shattered', 'novel_id' => 1, 'slug' => 'sabres-are-severed-intestines-are-shattered', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'sabres-are-severed-intestines-are-shattered'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 4 - To Live And Die With The Sabre', 'novel_id' => 1, 'slug' => 'to-live-and-die-with-the-sabre', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'to-live-and-die-with-the-sabre'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 5 - A Night In Bordertown', 'novel_id' => 1, 'slug' => 'a-night-in-bordertown', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'a-night-in-bordertown'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 6 - The Buried Sabre', 'novel_id' => 1, 'slug' => 'the-buried-sabre', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-buried-sabre'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 7 - Dark Clouds, Ominous Sky', 'novel_id' => 1, 'slug' => 'dark-clouds-ominous-sky', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'dark-clouds-ominous-sky'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 8 - Warmth of the Spring Breeze', 'novel_id' => 1, 'slug' => 'warmth-of-the-spring-breeze', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'warmth-of-the-spring-breeze'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 9 - Stable As A Giant Boulder', 'novel_id' => 1, 'slug' => 'stable-as-a-giant-boulder', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'stable-as-a-giant-boulder'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 10 - Silencing The Witness', 'novel_id' => 1, 'slug' => 'silencing-the-witness', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'silencing-the-witness'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 11 - Midnight Whispers', 'novel_id' => 1, 'slug' => 'midnight-whispers', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'midnight-whispers'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 12 - Hidden Projectile Experts', 'novel_id' => 1, 'slug' => 'hidden-projectile-experts', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'hidden-projectile-experts'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 13 - Third Madame Shen's Secret", 'novel_id' => 1, 'slug' => 'third-madame-shens-secret', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'third-madame-shens-secret'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 14 - A Proud Horse's Long Neigh", 'novel_id' => 1, 'slug' => 'a-proud-horses-long-neigh', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'a-proud-horses-long-neigh'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 15 - Soaring Flowers Fill The Sky', 'novel_id' => 1, 'slug' => 'soaring-flowers-fill-the-sky', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'soaring-flowers-fill-the-sky'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 16 - Once One Enters The 'Hall of Ten-Thousand Horses' ...", 'novel_id' => 1, 'slug' => 'once-one-enters-the-hall-of-ten-thousand-horses-forget-about-ever-returning-home', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'once-one-enters-the-hall-of-ten-thousand-horses-forget-about-ever-returning-home'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 17 - The Mysterious Old Lady', 'novel_id' => 1, 'slug' => 'the-mysterious-old-lady', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-mysterious-old-lady'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 18 - The Flying Dagger That Saves Lives', 'novel_id' => 1, 'slug' => 'the-flying-dagger-that-saves-lives', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-flying-dagger-that-saves-lives'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 19 - Cutting The Weeds And Pulling The Roots', 'novel_id' => 1, 'slug' => 'cutting-the-weeds-and-pulling-the-roots', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'cutting-the-weeds-and-pulling-the-roots'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 20 - A Drunken Haze To Solve A Thousand Worries', 'novel_id' => 1, 'slug' => 'a-drunken-haze-to-solve-a-thousand-worries', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'a-drunken-haze-to-solve-a-thousand-worries'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 21 - The Sword Without A Sheathe', 'novel_id' => 1, 'slug' => 'the-sword-without-a-sheathe', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-sword-without-a-sheathe'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 22 - Prelude and Postlude To A Murder', 'novel_id' => 1, 'slug' => 'prelude-and-postlude-to-a-murder', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'prelude-and-postlude-to-a-murder'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 23 - Little Bells Ring *Ding Dang*', 'novel_id' => 1, 'slug' => 'little-bells-ring-ding-dang', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'little-bells-ring-ding-dang'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 24 - Grand Flag Waving In The Setting Sun', 'novel_id' => 1, 'slug' => 'grand-flag-waving-in-the-setting-sun', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'grand-flag-waving-in-the-setting-sun'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 25 - One Sword Shakes All Four Directions', 'novel_id' => 1, 'slug' => 'one-sword-shakes-all-four-directions', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'one-sword-shakes-all-four-directions'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 26 - Blood Debt As Deep As The Sea', 'novel_id' => 1, 'slug' => 'blood-debt-as-deep-as-the-sea', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'blood-debt-as-deep-as-the-sea'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 27 - The Sabre Emerges From Its Sheathe', 'novel_id' => 1, 'slug' => 'the-sabre-emerges-from-its-sheathe', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-sabre-emerges-from-its-sheathe'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => "Chapter 28 - In A Lady's Company", 'novel_id' => 1, 'slug' => 'in-a-ladys-company', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'in-a-ladys-company'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 29 - A Venomous Beauty', 'novel_id' => 1, 'slug' => 'a-venomous-beauty', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'a-venomous-beauty'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 30 - The Flower Guarding Swordsman', 'novel_id' => 1, 'slug' => 'the-flower-guarding-swordsman', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-flower-guarding-swordsman'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 31 - Engraved In The Heart', 'novel_id' => 1, 'slug' => 'engraved-in-the-heart', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'engraved-in-the-heart'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 32 - Little Li Flying Dagger', 'novel_id' => 1, 'slug' => 'little-li-flying-dagger', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'little-li-flying-dagger'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 33 - Perish Under The Saber', 'novel_id' => 1, 'slug' => 'perish-under-the-saber', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'perish-under-the-saber'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 34 - Master of The Hall of Goldy Saber', 'novel_id' => 1, 'slug' => 'master-of-the-hall-of-the-godly-saber', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'master-of-the-hall-of-the-godly-saber'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 35 - A Highly Skilled Senior', 'novel_id' => 1, 'slug' => 'a-highly-skilled-senior', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'a-highly-skilled-senior'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 36 - That Stage Which is Life', 'novel_id' => 1, 'slug' => 'that-stage-which-is-life', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'that-stage-which-is-life'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 37 - The Prodigal Son Returns', 'novel_id' => 1, 'slug' => 'the-prodigal-son-returns', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-prodigal-son-returns'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 38 - The Lady of the Plum Blossom', 'novel_id' => 1, 'slug' => 'the-lady-of-the-plum-blossom', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-lady-of-the-plum-blossom'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 39 - Love as Deep as the Sea', 'novel_id' => 1, 'slug' => 'love-as-deep-as-the-sea', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'love-as-deep-as-the-sea'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 40 - New Hatred Piled on Old', 'novel_id' => 1, 'slug' => 'new-hatred-piled-on-old', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'new-hatred-piled-on-old'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 41 - Heroes’ Impasse', 'novel_id' => 1, 'slug' => 'heroes-impasse', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'heroes-impasse'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 42 - The Road to Ruin, the Severing Blade', 'novel_id' => 1, 'slug' => 'the-road-to-ruin-the-severing-blade', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-road-to-ruin-the-severing-blade'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 43 - The Descendants of an Aristocratic Family', 'novel_id' => 1, 'slug' => 'the-descendants-of-an-aristocratic-family', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-descendants-of-an-aristocratic-family'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 44 - The Two Heroes of the Ding Family', 'novel_id' => 1, 'slug' => 'the-two-heroes-of-the-ding-family', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'the-two-heroes-of-the-ding-family'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 45 - Benevolence and Hatred are Resolved', 'novel_id' => 1, 'slug' => 'benevolence-and-hatred-are-resolved', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'benevolence-and-hatred-are-resolved'), 'updated_at' => $now, 'created_at' => $now],
            ['title' => 'Chapter 46 - Love is Eternal', 'novel_id' => 1, 'slug' => 'love-is-eternal-end', 'content' => Chapter::getChapterContent('bordertown-wanderer', 'love-is-eternal-end'), 'updated_at' => $now, 'created_at' => $now],
        ]);
    }
}