import axios from "@/lib/axios"
import { csrf } from "@/lib/csrf"
import { useQueryClient, useMutation } from "react-query"

export const useLogOut = () => {
    const queryClient = useQueryClient()

    const logOutMutation = useMutation({
        mutationFn: () => {
            return axios.post('/logout')
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const logOut = async () => {
        await csrf()
        logOutMutation.mutate()
    }

    return { logOut }
}