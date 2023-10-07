import axios from "@/lib/axios"
import { INovel } from "@/types/novelType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovel = (slug: string) => {
    const { data, isLoading, isError, error } = useQuery<INovel, AxiosError>(
        ['novel', slug],
        () => {
            return axios
                .get(`/api/novels/${slug}`)
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