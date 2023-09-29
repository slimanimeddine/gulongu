import axios from "@/lib/axios"
import { IReview } from "@/types/reviewType";
import { AxiosError } from "axios";
import { useQuery } from "react-query"

export const useNovelReviews = (novelSlug: string) => {
    const { data, isLoading, isError, error } = useQuery<{ reviews: IReview[] }, AxiosError>(`/reviews/${novelSlug}`, () => {
        return axios
            .get(`/api/reviews/${novelSlug}`)
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