import Image from "next/image";
import Link from "next/link";
import { PhotoIcon, ThumbUpIcon } from "./svgIcons";

export interface NovelCardProps {
  genre: string,
  imageSrc?: string,
  title: string,
  likes: number,
  synopsis: string,
  slug: string,
}

export interface NovelCardPropsSeries {
  genres: string[],
  imageSrc?: string,
  title: string,
  likes: number,
  synopsis: string,
  slug: string,
}

export function NovelCard({
  genre,
  imageSrc,
  title,
  likes,
  synopsis,
  slug
}: NovelCardProps) {
  return (
    <div className={"rounded-md bg-gradient-to-r from-blue-200 to-blue-500 flex flex-col gap-2 p-3 items-center w-70"}>
      <span className="text-base text-white font-medium capitalize">{genre}</span>
      <Link href={`novel/${slug}`}>
        {
          imageSrc
            ? <Image
              src={imageSrc}
              width={112}
              height={164}
              alt=""
            />
            : <div className="border border-black rounded-lg">
              <PhotoIcon width={112} height={164} />
            </div>
        }
      </Link>
      <Link href={`novel/${slug}`} className="text-base font-bold capitalize dark:text-black">{title}</Link>
      <div className="flex">
        <ThumbUpIcon series={false} />
        <span className="font-medium dark:text-black">{likes}%</span>
      </div>
      <p className="text-xs text-gray-800 line-clamp-2">{synopsis}</p>
    </div>
  )
}

export function NovelCardSeries({
  genres,
  imageSrc,
  title,
  likes,
  synopsis,
  slug
}: NovelCardPropsSeries) {
  return (
    <div className="flex justify-start gap-3">
      {
        imageSrc
          ? <Image
            src={imageSrc}
            width={125}
            height={180}
            alt=""
          />
          : <div className="border border-black rounded-lg">
            <PhotoIcon width={112} height={164} />
          </div>
      }
      <div className="flex flex-col justify-between">
        <Link href={`novel/${slug}`} className="capitalize text-lg font-semibold hover:underline hover:underline-offset-1">{title}</Link>
        <div className="flex">
          <ThumbUpIcon series={true} />
          <span className="font-medium">{likes}%</span>
        </div>
        <Link href={`novel/${slug}`} className="text-sm line-clamp-3 hover:underline hover:underline-offset-1">{synopsis}</Link>
        <div className="flex justify-start gap-2 mt-8 flex-wrap">
          {genres.map(item => (
            <div key={item} className="px-4 py-1 capitalize text-sm font-medium rounded-md border  hover:text-sky-500 hover:border-sky-500 hover:cursor-pointer dark:text-gray-400 dark:hover:text-sky-500">{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}