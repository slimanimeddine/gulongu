import axios from "@/lib/axios"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast";

interface AddBookmarkPros {
    novelSlug: string,
    novelTitle: string,
    chapterSlug: string,
    chapterTitle: string,
}

export const useAddBookmark = (

) => {
    const queryClient = useQueryClient()
    const addBookmarkMutation = useMutation({
        mutationFn: (props: AddBookmarkPros) => {
            return axios
                .post('/api/bookmarks', props)
                .then()
                .catch(error => {
                    console.log(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
            toast.success('Chapter marked as read!')
        },
    })

    return addBookmarkMutation

}