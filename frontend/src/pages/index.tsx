import Head from "next/head";
import { NovelCard } from "@/components/novelCard";
import { useNovels } from "@/hooks/useNovels";
import { filterFieldsIndex } from "@/helpers/filterFields";
import { getRandomNumber } from "@/helpers/getRandomNumber";
import { INovel } from "@/types/novelType";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";

export default function Home() {
  let elementToRender
  const { data, isLoading, isError, error } = useNovels()

  if (data) {
    const novelsData = data.map((item: INovel) => filterFieldsIndex(item))
    elementToRender = <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {novelsData.map(item => (
        <NovelCard {...item} key={item.id} likes={getRandomNumber()} />
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
    <div className="px-20 py-10">
      <Head>
        <title>Gulongu | Read Gulong&apos;s novels</title>
        <meta property="og:title" content="Gulongu | Read Gulong's novels" key="title" />
      </Head>
      <h1 className="text-4xl font-bold capitalize text-black dark:text-white text-left">Available <span className="uppercase">gulong&apos;</span><span className="lowercase">s</span>  novels</h1>
      <p className="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300 text-left">These are the ones available for the time being.</p>
      {elementToRender}
    </div>
  );
}
