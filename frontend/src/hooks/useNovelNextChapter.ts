import axios from "@/lib/axios"
import { IChapter } from "@/types/chapterType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovelNextChapter = (novelSlug: string, chapterSlug: string) => {
    const { data, isLoading, isError, error } = useQuery<{ nextChapter: IChapter }, AxiosError>(`novels/${novelSlug}/chapters/${chapterSlug}/next`,
        () => {
            return axios
                .get(`/api/novels/${novelSlug}/chapters/${chapterSlug}/next`)
                .then(res => res.data)
                .then(err => err)
        }
    )

    return {
        data,
        isLoading,
        isError,
        error
    }
}