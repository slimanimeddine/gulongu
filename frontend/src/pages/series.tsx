import Head from "next/head";
import { type NovelCardPropsSeries, NovelCardSeries } from "@/components/novelCard";
import { SortRadioGroup } from "@/components/sortRadioGroup";
import { FilterCombobox } from "@/components/filterCombobox";

export default function Series() {
    const novelProps: NovelCardPropsSeries = {
        genres: ["fantasy", "action"],
        title: "spirit realm",
        likes: 55,
        synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, facere fugit. Libero eaque corrupti atque, sit ipsum iure dolore perspiciatis quia fuga rem harum ex iusto omnis sapiente. Incidunt, natus."
    }

    const novelCards = Array(20).fill(novelProps)

    return (
        <>
            <Head>
                <title>Novels | Gulongu</title>
                <meta property="og:title" content="Novels | Gulongu" key="title" />
            </Head>
            <div className="px-20 py-8 max-sm:px-5 bg-gray-100 dark:bg-black">
                <SortRadioGroup />
                <FilterCombobox />
            </div>
            <div className="grid gap-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:px-5 px-20 my-5">
                {novelCards.map((item, i) => (
                    <NovelCardSeries {...item} key={i} />
                ))}
            </div>
        </>
    )
}