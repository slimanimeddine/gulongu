import axios from "@/lib/axios"
import { INovel } from "@/types/novelType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useNovels = () => {
    const { data, isLoading, isError, error } = useQuery<INovel[], AxiosError>('novels', () => {
        return axios
            .get('/api/novels')
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