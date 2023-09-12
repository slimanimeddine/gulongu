import Head from "next/head";
import { useState } from "react"
import { Popover } from '@headlessui/react'
import { Comment } from "@/components/comment";
import { useRouter } from 'next/router'
import { BigChevronLeftIcon, CaretDownIcon, CaretUpIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@/components/svgIcons";
import ChaptersSlideOver from "@/components/chaptersSlideOver";

function Pagination() {
    return (
        <div className="flex justify-start items-center gap-2 max-md:px-2">
            <button
                className="border rounded-md cursor-auto text-gray-400 h-[32px] w-[32px] flex justify-center items-center"
            >
                <ChevronLeftIcon />
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border border-sky-600 rounded-md"
            >
                1
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                2
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                3
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                4
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                5
            </button>
            <span>...</span>
            <button
                className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
            >
                14
            </button>
            <button
                className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
            >
                <ChevronRightIcon />
            </button>
        </div>
    )
}

function createMarkup() {
    return {
        __html: `<blockquote class="postcontent restore">
 The room was devoid of any color ... except black!
 <br/>
 <br/>
 Even the rays of the evening sun were transformed into a deathly gray.
 <br/>
 <br/>
 Before the evening sun had started to set, she was already kneeling down in front of the black shrine.
 <br/>
 <br/>
 Black curtains were hung throughout. No one could see which god was being worshipped and no one could see what her face was like.
 <br/>
 <br/>
 She wore a black veil over her face. The ends of her long black robe were scattered in disarray over the floor. The only thing that leaked out were a pair of old, shriveled claw-like hands.
 <br/>
 <br/>
 Her hands were held together as she quietly recited a chant. But she was not praying for luck or good fortune. Rather, she was invoking a curse.
 <br/>
 <br/>
 She cursed the gods, cursed the world, and cursed every single thing between the heavens and earth.
 <br/>
 <br/>
 A young child clothed in black knelt motionlessly behind her. It seemed as if he had been by her side since ancient times. In fact, he appeared very much ready to kneel beside her until the end of the world.
 <br/>
 <br/>
 The evening sun shined down onto his face. His facial features were handsome and prominent, but they appeared to be made of ice from the tops of a faraway mountain.
 <br/>
 <br/>
 The setting sun was weak and insipid. The howling winds cried out.
 <br/>
 <br/>
 Suddenly, she stood up and tore apart the black curtains in front of the shrine. She took into her hands an ebony black steel coffer.
 <br/>
 <br/>
 Could it be that this was what she had been worshipping? She grasped on to the black coffer with all her might, muscles and tendons bulged out of her hands as she shook uncontrollably.
 <br/>
 <br/>
 A sabre rested on the altar. Its scabbard was ebony black. Its hilt was ebony black.
 <br/>
 <br/>
 She suddenly took the sabre and cut the steel coffer in half.
 <br/>
 <br/>
 There was nothing inside except for a heap of powdery red dust.
 <br/>
 <br/>
 She took a handful into her hand and said, "Do you know what this is?"
 <br/>
 <br/>
 Nobody would know - except for her, nobody could possibly know!
 <br/>
 <br/>
 "It is snow ... it is the red snow!"
 <br/>
 <br/>
 Her voice was sharp and bitter, like the cry of a lost soul in the wintry night.
 <br/>
 <br/>
 "When you were born, the snow that fell was red ... stained red with blood!"
 <br/>
 <br/>
 The child in black lowered his head.
 <br/>
 <br/>
 She walked up to him and sprinkled the red snow over his head.
 <br/>
 <br/>
 "You must remember that from this day forth you are a god ... the God of Revenge! No matter what you choose to do, do with no regrets. No matter how you decide to punish them, it will be deserved." A mysterious confidence surged through her voice, as if all the demons and spirits between the heavens and earth had been summoned into the specks of red dust in her hands that were being applied to the child in black. Then she lifted both her palms into the air and loudly proclaimed, "For this one moment, I've spent eighteen years, eighteen years! And now that everything has been completely prepared, why haven't you left yet?"
 <br/>
 <br/>
 The child in black lowered his head and replied, "I ..."
 <br/>
 <br/>
 She took the sabre and stabbed it down into the ground in front of him.
 <br/>
 <br/>
 "Hurry up and go! Use this sabre to sever every single one of their heads! Don't return unless you've succeeded, or else the heavens will curse you, and I will curse you as well!"
 <br/>
 <br/>
 The winds were howling.
 <br/>
 <br/>
 She watched as he slowly walked out into the darkness, his figure slowly melded into the black night.
 <br/>
 <br/>
 The sabre in his hand also slowly melded into the black night.
 <br/>
 <br/>
 The entire world was blanketed by the dark black night.
</blockquote>
`};
}

export default function Chapter() {
    const router = useRouter()

    const [sort, setSort] = useState("top")
    const comment = {
        username: "slimanimeddine",
        date: "5 years ago",
        content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
        likes: 55,
        dislikes: 12,
        commentReplies: [
            {
                username: "slimanimeddine",
                date: "5 years ago",
                content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
                likes: 55,
                dislikes: 12,
            },
            {
                username: "slimanimeddine",
                date: "5 years ago",
                content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
                likes: 55,
                dislikes: 12,
            },
        ]
    }

    const comments = Array(10).fill(comment)

    return (
        <>
            <Head>
                <title>Unsheathed - Chapter 1: Jingzhe</title>
                <meta property="og:title" content="A Record of a Mortal's Journey to Immortality: Immortal Realm | Gulongu" key="title" />
            </Head>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full py-3">
                    <div className="flex justify-between items-center max-md:px-2">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => router.back()}
                                type="button"
                            >
                                <BigChevronLeftIcon />
                            </button>
                            <div className="border border-black rounded-lg">
                                <PhotoIcon width={29} height={40} />
                            </div>
                            <span className="font-semibold">Unsheathed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled className="rounded-full border p-1 text-gray-300">
                                <ChevronLeftIcon />
                            </button>
                            <button className="rounded-full border border-blue-500 p-1 hover:shadow-xl">
                                <ChevronRightIcon />
                            </button>
                            <ChaptersSlideOver />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full flex flex-col gap-4 items-start py-4 max-md:px-2">
                    <h1 className="text-2xl text-left text-gray-800 font-bold capitalize dark:text-gray-100">chapter 1: keyboard warrior</h1>
                    {/* markup */}
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    <button className="self-center bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-full text-lg font-bold text-center py-4 w-48 my-4">next chapter</button>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex w-full justify-between items-center my-5 max-md:px-2">
                    <span className="capitalize text-lg font-bold">1,556 Comments</span>
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button className="inline-flex justify-between items-center px-2 py-1 capitalize text-md rounded-md border dark:bg-stone-800 hover:shadow-md hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 outline-none">
                                    <span>{sort}</span>
                                    {
                                        open
                                            ? <CaretUpIcon />
                                            : <CaretDownIcon />
                                    }
                                </Popover.Button>

                                <Popover.Panel className="absolute z-10 right-0">
                                    <div className="flex flex-col py-2 shadow-md justify-start bg-white rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                                        <button onClick={() => setSort("top")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">top</button>
                                        <button onClick={() => setSort("new")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">new</button>
                                        <button onClick={() => setSort("old")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">old</button>
                                    </div>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex flex-col items-start gap-5 max-md:px-2">
                    {comments.map((item, i) => (
                        <Comment {...item} key={i} />
                    ))}
                </div>
            </div>
            <div className="flex justify-start items-center max-w-4xl my-8 mx-auto">
                <Pagination />
            </div>
        </>
    )
}