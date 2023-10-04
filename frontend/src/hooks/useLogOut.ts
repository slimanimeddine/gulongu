import axios from "@/lib/axios"
import { csrf } from "@/lib/csrf"
import { useRouter } from "next/router"
import { useQueryClient, useMutation } from "react-query"

export const useLogOut = () => {
    const queryClient = useQueryClient()
    const router = useRouter();


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
        router.reload()
    }

    return { logOut }
}