import axios from "@/lib/axios"
import { IChapter } from "@/types/chapterType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovelChapters = (slug: string, enabled: boolean) => {
    const { data, isLoading, isError, error } = useQuery<Omit<IChapter, "content">[], AxiosError>({
        queryKey: ['chapters', slug],
        queryFn: () => {
            return axios
                .get(`/api/novels/${slug}/chapters`)
                .then(res => res.data)
                .then(err => err)
        },
        enabled
    })

    return {
        data,
        isLoading,
        isError,
        error,
    }
}