import Head from "next/head";
import { NovelCardSeries } from "@/components/novelCard";
import { SortRadioGroup } from "@/components/sortRadioGroup";
import { FilterCombobox } from "@/components/filterCombobox";
import { useNovels } from "@/hooks/useNovels";
import { filterFieldsSeries } from "@/helpers/filterFields";
import { getRandomNumber } from "@/helpers/getRandomNumber";
import { INovel } from "@/types/novelType";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";

export default function Series() {
    let elementToRender
    const { data, isLoading, isError, error } = useNovels()
    if (data) {
        const novelsData = data.map((item: INovel) => filterFieldsSeries(item))
        elementToRender = <div className="grid gap-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:px-5 px-20 my-5">
            {novelsData.map(item => (
                <NovelCardSeries {...item} key={item.id} likes={getRandomNumber()} />
            ))}
        </div>
    }

    if (isLoading) {
        elementToRender = <Loading />
    }

    if (isError) {
        elementToRender = <ServerError message={error?.message ?? "can't find resource"} />
    }

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
            {elementToRender}
        </>
    )
}