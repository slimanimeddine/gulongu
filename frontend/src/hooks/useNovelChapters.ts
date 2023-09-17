import axios from "@/lib/axios"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
interface FilteredChapter {
    id: number,
    title: string,
    slug: string,
    created_at: string
}

export const useNovelChapters = (slug: string) => {
    const { data, isLoading, isError, error } = useQuery<{ chapters: FilteredChapter[] }, AxiosError>(`novels/${slug}/chapters`, () => {
        return axios
            .get(`/api/novels/${slug}/chapters`)
            .then(res => res.data)
            .then(err => err)
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}