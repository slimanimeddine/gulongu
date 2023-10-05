import axios from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { z } from "zod"
import { InputError } from "./inputError"

export const addCommentReplySchema = z.object({
    content: z.string({
        required_error: "review reply content is required",
    }).min(1, "review reply is empty")
})

export type TAddCommentReplySchema = z.infer<typeof addCommentReplySchema>

export const addCommentReplySchemaServerErrors = z.object({
    content: z.string().array().optional()
})

export type TAddCommentReplySchemaServerErrors = z.infer<typeof addCommentReplySchemaServerErrors>

export function AddCommentReply({
    comment_id,
}: {
    comment_id: number,
}) {
    const [serverErrors, setServerErrors] = useState<TAddCommentReplySchemaServerErrors>()
    const queryClient = useQueryClient()

    const addCommentReplyMutation = useMutation({
        mutationFn: (props: TAddCommentReplySchema) => {
            return axios
                .post('/api/commentReplies', {
                    content: props.content,
                    comment_id,
                    likes: 0,
                    dislikes: 0
                })
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/commentReplies/${comment_id}`] })
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isDirty,
            isValid
        },
        reset,
        setError,
    } = useForm<TAddCommentReplySchema>({
        resolver: zodResolver(addCommentReplySchema)
    })

    const onSubmit = async (data: TAddCommentReplySchema) => {
        addCommentReplyMutation.mutate(data)

        if (serverErrors) {
            if (serverErrors.content) {
                setError("content", {
                    type: "server",
                    message: serverErrors.content[0]
                });
            }
        } else {
            toast.success('Reply added successfully!')
            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center gap-2 p-6 shadow-md shadow-slate-300 rounded-lg border w-full">
            <textarea
                {...register("content")}
                placeholder="Add a Comment"
                className="w-full outline-none rounded-md bg-gray-200 p-2 mt-2 border border-gray-200 dark:border-white/10 dark:bg-white/10 hover:border-blue-500 dark:hover:border-blue-500"
            >
            </textarea>
            <div className="font-medium text-left">
                <InputError
                    error={errors.content}
                    message={errors?.content?.message}
                />
            </div>
            <button
                className="bg-gray-300 rounded-full py-1 px-3 text-sm font-semibold text-gray-600 place-self-end"
                disabled={isSubmitting || !isDirty || !isValid}
                style={!(isSubmitting || !isDirty || !isValid)
                    ? {
                        backgroundColor: "rgb(29 78 216)",
                        color: "white"
                    } : {

                    }}
            >
                Submit
            </button>
        </form>
    )
}