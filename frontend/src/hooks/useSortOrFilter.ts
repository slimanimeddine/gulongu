import axios from "@/lib/axios"
import { INovel } from "@/types/novelType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

interface IProps {
    sortBy: "name" | "chapters",
    filter: string
}

export const useSortOrFilter = ({
    sortBy,
    filter
}: IProps) => {
    const { data, isLoading, isError, error } = useQuery<INovel[], AxiosError>(`/novels/${sortBy}/${filter}/sortorfilter`, () => {
        return axios
            .get(`/api/novels/${sortBy}/${filter}/sortorfilter`)
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