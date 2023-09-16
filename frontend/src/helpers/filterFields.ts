import { INovel } from "@/types/novelType";

interface IFilteredFieldsIndex {
    genre: string,
    id: number,
    synopsis: string,
    title: string,
    slug: string
}

interface IFilteredFieldsSeries {
    genres: string[],
    id: number,
    synopsis: string,
    title: string,
    slug: string
}

const randomItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
}

export const filterFieldsIndex = (novel: INovel): IFilteredFieldsIndex => {
    return {
        id: novel.id,
        title: novel.title,
        synopsis: novel.synopsis,
        genre: randomItem(novel.genres),
        slug: novel.slug
    }
}

export const filterFieldsSeries = (novel: INovel): IFilteredFieldsSeries => {
    return {
        id: novel.id,
        title: novel.title,
        synopsis: novel.synopsis,
        genres: novel.genres,
        slug: novel.slug
    }
}