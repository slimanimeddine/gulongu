import axios from "@/lib/axios"
import { IBookmark } from "@/types/bookmarkType";
import { AxiosError } from "axios";
import { useQuery } from "react-query"
import { useUser } from "./useUser";

export const useUserBookmarks = () => {
    const { data: user } = useUser()
    const userId = user?.id
    const { data, isLoading, isError, error } = useQuery<{ bookmarks: IBookmark[] }, AxiosError>({
        queryKey: ['bookmarks', userId],
        queryFn: () => {
            return axios
                .get(`/api/bookmarks/${userId}`)
                .then(res => res.data)
                .then(err => err)
        },
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}