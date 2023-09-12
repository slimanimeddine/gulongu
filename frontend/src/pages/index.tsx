import Head from "next/head";
import { NovelCard } from "@/components/novelCard";

export default function Home() {
  const novelProps = {
    genre: "mystery",
    title: "spirit realm",
    likes: 55,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, facere fugit. Libero eaque corrupti atque, sit ipsum iure dolore perspiciatis quia fuga rem harum ex iusto omnis sapiente. Incidunt, natus.",
  }

  const novels = Array(20).fill(novelProps)

  return (
    <div className="px-20 py-10">
      <Head>
        <title>Gulongu | Read Gulong&apos;s novels</title>
        <meta property="og:title" content="Gulongu | Read Gulong's novels" key="title" />
      </Head>
      <h1 className="text-4xl font-bold capitalize text-black dark:text-white text-left">Available <span className="uppercase">gulong&apos;</span><span className="lowercase">s</span>  novels</h1>
      <p className="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300 text-left">These are the ones available for the time being.</p>
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {novels.map((item, i) => (
          <NovelCard {...item} key={i} />
        ))}
      </div>
    </div>
  );
}
