import axios from "@/lib/axios"
import { IChapter } from "@/types/chapterType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovelChapter = (novel: string, chapter: string) => {
    const { data, isLoading, isError, error } = useQuery<{ chapter: IChapter }, AxiosError>(`novels/${novel}/chapters/${chapter}`, () => {
        return axios
            .get(`/api/novels/${novel}/chapters/${chapter}`)
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