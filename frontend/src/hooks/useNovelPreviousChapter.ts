import axios from "@/lib/axios"
import { IChapter } from "@/types/chapterType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovelPreviousChapter = (novelSlug: string, chapterSlug: string) => {
    const { data, isLoading, isError, error } = useQuery<Omit<IChapter, "content">, AxiosError>(
        ['novels', novelSlug, 'chapters', chapterSlug, 'previous'],
        () => {
            return axios
                .get(`/api/novels/${novelSlug}/chapters/${chapterSlug}/previous`)
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