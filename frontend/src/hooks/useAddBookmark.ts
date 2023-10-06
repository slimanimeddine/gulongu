import axios from "@/lib/axios"
import { useMutation, useQueryClient } from "react-query"
import { useUser } from "./useUser";
import { useState } from "react";

interface AddBookmarkPros {
    novelSlug: string,
    novelTitle: string,
    chapterSlug: string,
    chapterTitle: string,
}

export const useAddBookmark = (
    props: AddBookmarkPros,
) => {
    const [added, setAdded] = useState(false)
    const queryClient = useQueryClient()
    const { data: user } = useUser()
    const addBookmarkMutation = useMutation({
        mutationFn: () => {
            return axios
                .post('/api/bookmarks', props)
                .then()
                .catch(error => {
                    console.log(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] })
            setAdded(true)
        }
    })

    return {
        addBookmarkMutation,
        added
    }
}