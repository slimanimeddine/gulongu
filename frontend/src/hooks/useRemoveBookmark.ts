import axios from "@/lib/axios"
import { useMutation, useQueryClient } from "react-query"

export const useRemoveBookmark = () => {
    const queryClient = useQueryClient()
    const removeBookmarkMutation = useMutation({
        mutationFn: (bookmarkId: number) => {
            return axios
                .delete(`/api/bookmarks/${bookmarkId}`)
                .then()
                .catch(error => {
                    console.log(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
        }
    })

    return removeBookmarkMutation
}