import axios from "@/lib/axios"
import { IBookmark } from "@/types/bookmarkType";
import { AxiosError } from "axios";
import { useQuery } from "react-query"

export const useUserBookmarks = (sortBy: "lastRead" | "novelName", order: "asc" | "desc") => {
    const { data, isLoading, isError, error, refetch, isRefetching, isRefetchError } = useQuery<IBookmark[], AxiosError>({
        queryKey: ['bookmarks', sortBy, order],
        queryFn: () => {
            return axios
                .get(`/api/bookmarks/${sortBy}/${order}`)
                .then(res => res.data)
                .then(err => err)
        },
    })

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isRefetching,
        isRefetchError
    }
}