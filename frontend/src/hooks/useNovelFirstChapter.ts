import axios from "@/lib/axios"
import { IChapter } from "@/types/chapterType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovelFirstChapter = (novelSlug: string) => {
    const { data, isLoading, isError, error } = useQuery<{ firstChapter: IChapter }, AxiosError>(`novels/${novelSlug}/first`,
        () => {
            return axios
                .get(`/api/novels/${novelSlug}/first`)
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