import axios from "@/lib/axios"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
interface FilteredChapter {
    id: number,
    title: string,
    slug: string,
    created_at: string
}

export const useNovelChapters = (slug: string, enabled: boolean) => {
    const { data, isLoading, isError, error } = useQuery<{ chapters: FilteredChapter[] }, AxiosError>({
        queryKey: `novels/${slug}/chapters`,
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
        error
    }
}