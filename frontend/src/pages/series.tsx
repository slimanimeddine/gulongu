import Head from "next/head";
import { NovelCardSeries } from "@/components/novelCard";
import { filterFieldsSeries } from "@/helpers/filterFields";
import { INovel } from "@/types/novelType";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";
import { SeriesSortFilter } from "@/components/seriesSortFilter";
import { useSearchParams } from "next/navigation";
import { useSortOrFilter } from "@/hooks/useSortOrFilter";

export default function Series() {
    const searchParams = useSearchParams()
    const sortBy = searchParams.get("sortBy") as "name" | "chapters" | "rating"
    const filter = searchParams.get("filter") as string
    let elementToRender
    const {
        data,
        isLoading,
        isError,
        error
    } = useSortOrFilter({
        sortBy: sortBy ?? "name",
        filter: filter ?? "none"
    })
    if (data) {
        const novelsData = data.map((item: INovel) => filterFieldsSeries(item))
        elementToRender = <div className="grid gap-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:px-5 px-20 my-5">
            {novelsData.length > 0
                ? novelsData.map(item => (
                    <NovelCardSeries {...item} key={item.id} />
                ))
                : "No novels found matching the selected filters."}
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
                <SeriesSortFilter />
            </div>
            {elementToRender}
        </>
    )
}