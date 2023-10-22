<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class NovelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = DB::raw('CURRENT_TIMESTAMP');
        DB::table('novels')->insert([
            //------------------------------------------------------
            [
                'title' => 'Bordertown Wanderer',
                'slug' => 'bordertown-wanderer',
                'translator' => 'Bliss et al',
                'synopsis' => 'Ye Kai, the protagonist of the second novel, is Li Xunhuan’s apprentice.

He inherits his master’s Little Li Flying Dagger. His best friend is Fu Hongxue.

The novel begins with the murders of a notable martial artist and his family. Ye Kai and Fu Hongxue set out to investigate and solve the case.

During their adventures, they meet their respective romantic interests: Ding Linglin and Cuinong.',
                'genres' => json_encode(["Action", "Adventure", "Martial arts", "Romance", "Wuxia"]),
                'updated_at' => $now,
                'created_at' => $now
            ],
            //------------------------------------------------------
            [
                'title' => 'Horizon, Bright Moon, Sabre',
                'slug' => 'horizon-bright-moon-sabre',
                'translator' => 'Ren Wo Xing, et al',
                'synopsis' => 'Fu Hongxue was a cripple, born with a lame leg and subject to epileptic seizures. He was also one of the most powerful, legendary figures of the martial arts world, with a dull black saber that was secoThe Jasper Villa wanted to select a suitable son-in-law amongst the four renowned gentlemen of Wulin. When three of gentlemen became victim of an evil scheme, Ma Rulong was accused of being the culprit. Being cornered, Ma Rulong escaped and must find a way to clear his name and find out who was real mastermind.nd to none. His fame made him a frequent target of challengers, but whenever his saber left its sheath, only corpses would remain in its wake. One day, however, Fu Hongxue rescued someone whom he should have killed…and in doing so, set of a chain of events and a conspiracy that would rock the world.',
                'genres' => json_encode(["Action ", "Adventure ", "Romance ", "Shounen ", "Wuxia"]),
                'updated_at' => $now,
                'created_at' => $now
            ],
            //------------------------------------------------------
            [
                'title' => 'Heroes Shed No Tears',
                'slug' => 'heroes-shed-no-tears',
                'translator' => 'Deathblade',
                'synopsis' => "Gao Jianfei: A naive martial arts genius, exploring the martial arts world for the first time in his life.

Zhu Meng: A man's man who lives by the sword, but who is more passionate and emotional than he realizes.

Sima Chaochun: The most famous martial artist in the world. Completely and utterly righteous. Or is he?

Zhuo Donglai: The brains behind Sima Chaochun's brawn, who always has a trick up his sleeve.

And the most fearsome weapon under heaven.

Heroes Shed No Tears is a tale of friendship and love, of loyalty and betrayal. Secrets upon secrets will be revealed; pay close attention, and you might be able to unravel the mystery before the characters do!",
                'genres' => json_encode(["Action","Adventure","Historical","Tragedy","Wuxia"]),
                'updated_at' => $now,
                'created_at' => $now
            ],
            //------------------------------------------------------
            [
                'title' => '7 Killers',
                'slug' => '7-killers',
                'translator' => 'Deathblade',
                'synopsis' => "Dragon Fifth is a powerful lord with incredible martial arts, and yet is wasting away from a fatal disease. The only medicine which can cure his sickness lies in the clutches of his venomous ex-wife, Madam Lovesickness, and is guarded by seven dangerous killers, fugitives of the martial world. Into this treacherous love spat tumbles Liu Changjie, a skilled martial artist who loves drinking and women, but has a mysterious past. All is not what it seems in this wuxia heist story. Can you decipher the mystery before the final reveal? (There are only seven chapters in this novel, but they are very long chapters. In total, the story is of equal length to roughly 20-25 average web novel chapters)",
                'genres' => json_encode(["Action","Adventure","Historical","Wuxia"]),
                'updated_at' => $now,
                'created_at' => $now
            ],
//             [
//                 'title' => 'The Celebrity',
//                 'slug' => 'the-celebrity',
//                 'translator' => 'Tiger Wong, KangXi, Paul, fastclock',
//                 'synopsis' => 'Story Tian Sisi is the spoiled, only daughter of a rich businessman who dreams of adventures and of Qin Ge, a famous hero from the Meteor Clan.

// However she is forced to marry Yang Fan, the son of her father’s friend.

// Sisi, who doesn’t think highly of Yang Fan, opposes the marriage and wishes to roam the world and live the great adventures she dreams of.',
//                 'genres' => json_encode(["Action", "Adventure", "Drama", "Martial ", "Arts ", "Romance ", "Shoujo ", "Wuxia"]),
//                 'updated_at' => $now,
//                 'created_at' => $now
//             ],
            // [
            //     'title' => 'Dragon King with Seven Stars',
            //     'slug' => 'dragon-king-with-seven-stars',
            //     'translator' => 'Deathblade',
            //     'synopsis' => 'Wu Tao, a small mysterious trader, suddenly appears in the city of Jinan and encounters with Yuanbao, a foxy little beggar. Wu Taos identity as a trader is suspected soon, because on the day before he appears, Sun Jicheng, a millionare in Jinan dies a mysterious death, and people finds the dead one is his substitute. Around the countless wealth, confusing identity and the seven mysterious stars in the little beggar, various figures come on stage, starting a magical adventure story.',
            //     'genres' => json_encode(["Action ", "Drama ", "Historical ", "Mystery ", "Wuxia"]),
            //     'updated_at' => $now,
            //     'created_at' => $now
            // ],
            // [
            //     'title' => 'Righteous Blood Cleansing the Silver Spear',
            //     'slug' => 'righteous-blood-cleansing-the-silver-spear',
            //     'translator' => 'kaister',
            //     'synopsis' => 'The Jasper Villa wanted to select a suitable son-in-law amongst the four renowned gentlemen of Wulin. When three of gentlemen became victim of an evil scheme, Ma Rulong was accused of being the culprit. Being cornered, Ma Rulong escaped and must find a way to clear his name and find out who was real mastermind.',
            //     'genres' => json_encode(["Mystery", "Thriller", "Romance", "Adventure", "Drama", "Wuxia"]),
            //     'updated_at' => $now,
            //     'created_at' => $now
            // ],
//             [
//                 'title' => 'Sword of the Third Young Master',
//                 'slug' => 'sword-of-the-third-young-master',
//                 'translator' => 'kara, chowbeng, xJadedx, Ren Wo Xing, Darkaos, Justin Lu, Kaister',
//                 'synopsis' => 'Storywise, this novel has initial premise for a duel between two swordsmen, Yan 13 and The Third Master of Xie Family (the title of the book is The Third Master). But then to make it a long story, the duel can’t be happening at the first part. Then the sub-plots appeared and rolling continuously.

// It’s a good read from Gu Long, with his distinctive writing style. There’re lots of betraying and plot twists in such a short novel, sometimes resulting in confusion for readers. The Third young master is a good character, with his personalities unravel mostly through other characters.

// Long story short, the duel was inevitable. The surprise at the end of duel was made this wuxia story uncommon.',
//                 'genres' => json_encode(["Action", "Adventure", "Martial", "Arts", "Wuxia"]),
//                 'updated_at' => $now,
//                 'created_at' => $now
//             ]
            // [
            //     'title' => '',
            //     'slug' => '',
            //     'translator' => '',
            //     'synopsis' => '',
            //     'genres' => [],
            // ],
        ]);
    }
}