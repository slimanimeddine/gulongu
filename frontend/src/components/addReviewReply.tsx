import axios from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { z } from "zod"
import { InputError } from "./inputError"

export const addReviewReplySchema = z.object({
    content: z.string({
        required_error: "review reply content is required",
    }).min(1, "review reply is empty")
})

export type TAddReviewReplySchema = z.infer<typeof addReviewReplySchema>

export const addReviewReplySchemaServerErrors = z.object({
    content: z.string().array().optional()
})

export type TAddReviewReplySchemaServerErrors = z.infer<typeof addReviewReplySchemaServerErrors>

export function AddReviewReply({
    review_id,
}: {
    review_id: number,
}) {
    const [serverErrors, setServerErrors] = useState<TAddReviewReplySchemaServerErrors>()
    const queryClient = useQueryClient()

    const addReviewReplyMutation = useMutation({
        mutationFn: (props: TAddReviewReplySchema) => {
            return axios
                .post('/api/reviewReplies', {
                    content: props.content,
                    review_id,
                })
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/reviewReplies/${review_id}`] })
            queryClient.invalidateQueries({ queryKey: ['reviews'] })
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
    } = useForm<TAddReviewReplySchema>({
        resolver: zodResolver(addReviewReplySchema)
    })

    const onSubmit = async (data: TAddReviewReplySchema) => {
        addReviewReplyMutation.mutate(data)

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