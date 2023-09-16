import { useQuery } from "react-query";
import axios from "@/lib/axios";
import { TUserSchema } from "@/types/userSchema";

export const useUser = () => {
    return useQuery<TUserSchema>('user', () => {
        return axios
                .get('/api/user')
                .then(res => res.data)
                .catch(err => err)
    })
}