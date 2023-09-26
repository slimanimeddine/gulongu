import axios from "@/lib/axios"
import { IGenre } from "@/types/genreType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useGenres = () => {
    const { data, isLoading, isError, error } = useQuery<IGenre[], AxiosError>(`/genres`, () => {
        return axios
            .get(`/api/genres`)
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