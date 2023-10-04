import { RadioGroup } from '@headlessui/react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { InputError } from "./inputError"
import { useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "@/lib/axios"

function countWords(inputString: string): number {
    const words = inputString.split(/\s+/);
    const nonEmptyWords = words.filter(word => word.trim() !== '');
    return nonEmptyWords.length;
}

export const addReviewSchema = z.object({
    vote: z.enum(["recommended", "notRecommended"]),
    content: z.string({
        required_error: "review content is required",
    })
}).refine(val => countWords(val.content) > 99, {
    message: "a review must have atleast 100 words"
})

export type TAddReviewSchema = z.infer<typeof addReviewSchema>

export const addReviewSchemaServerErrors = z.object({
    vote: z.string().array().optional(),
    content: z.string().array().optional()
})

export type TAddReviewSchemaServerErrors = z.infer<typeof addReviewSchema>

function Like({ checked }: { checked: boolean }) {
    return (
        <button
            type="button"
            className={checked ? "inline-flex rounded-full p-3 bg-green-600" : "inline-flex rounded-full p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/5"}
        >
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={checked ? "h-8 w-8 text-white" : "h-8 w-8 text-gray-600"}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.327 18H2a2 2 0 0 1-2-2V7.94a2 2 0 0 1 1.875-1.997l4.175-.26 3.641-3.768A3 3 0 0 1 11.848 1h.613a2 2 0 0 1 1.828 2.812l-.676 1.522 1.288-.13a4.343 4.343 0 0 1 4.577 5.618l-1.375 4.402A3.956 3.956 0 0 1 14.327 18ZM7 7.578V16h7.327c.855 0 1.611-.556 1.867-1.372l1.375-4.403a2.343 2.343 0 0 0-2.469-3.03l-3 .3a1 1 0 0 1-1.014-1.401L12.461 3h-.613a1 1 0 0 0-.719.305L7 7.578Zm-2 .174-3 .187V16h3V7.752Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    )
}

function Dislike({ checked }: { checked: boolean }) {
    return (
        <button
            type="button"
            className={checked ? "inline-flex rounded-full p-3 bg-red-600" : "inline-flex rounded-full p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/5"}
        >
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={checked ? "h-8 w-8 text-white rotate-180" : "h-8 w-8 text-gray-600 rotate-180"}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.327 18H2a2 2 0 0 1-2-2V7.94a2 2 0 0 1 1.875-1.997l4.175-.26 3.641-3.768A3 3 0 0 1 11.848 1h.613a2 2 0 0 1 1.828 2.812l-.676 1.522 1.288-.13a4.343 4.343 0 0 1 4.577 5.618l-1.375 4.402A3.956 3.956 0 0 1 14.327 18ZM7 7.578V16h7.327c.855 0 1.611-.556 1.867-1.372l1.375-4.403a2.343 2.343 0 0 0-2.469-3.03l-3 .3a1 1 0 0 1-1.014-1.401L12.461 3h-.613a1 1 0 0 0-.719.305L7 7.578Zm-2 .174-3 .187V16h3V7.752Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    )
}

export function AddReview({
    novel_id,
    novelSlug,
    novelTitle
}: {
    novel_id: number,
    novelSlug: string,
    novelTitle: string,
}) {
    const [serverErrors, setServerErrors] = useState<TAddReviewSchemaServerErrors>()

    const queryClient = useQueryClient()

    const addReviewMutation = useMutation({
        mutationFn: (props: TAddReviewSchema) => {
            return axios
                .post('/api/reviews', {
                    content: props.content,
                    novel_id,
                    isRecommended: props.vote === 'recommended' ? 1 : 0,
                    likes: 0,
                    dislikes: 0,
                    numberOfReplies: 0,
                    novelSlug,
                })
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', novelSlug], exact: true })
        }
    })

    const {
        control,
        watch,
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
    } = useForm<TAddReviewSchema>({
        resolver: zodResolver(addReviewSchema)
    })

    const content = watch("content")

    const onSubmit = async (data: TAddReviewSchema) => {
        addReviewMutation.mutate(data)

        if (serverErrors) {
            if (serverErrors.vote) {
                setError("vote", {
                    type: "server",
                    message: serverErrors.vote[0]
                });
            }
            if (serverErrors.content) {
                setError("content", {
                    type: "server",
                    message: serverErrors.content[0]
                });
            }
        } else {
            toast.success('Review added successfully!')
            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center gap-2 p-6 shadow-md shadow-slate-300 rounded-lg border w-full">
            <span className="font-medium text-gray-800 text-sm dark:text-gray-400">Write a review</span>
            <span className="font-semibold text-lg">{`Enjoy ${novelTitle} ?`}</span>
            <div className="flex justify-center items-center">
                <Controller
                    name="vote"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            className="flex justify-start items-center gap-6"
                            value={field.value}
                            onChange={field.onChange}
                        >
                            <RadioGroup.Option value="recommended">
                                {({ checked }) => (
                                    <Like checked={checked} />
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="notRecommended">
                                {({ checked }) => (
                                    <Dislike checked={checked} />
                                )}
                            </RadioGroup.Option>
                        </RadioGroup>
                    )}
                />
            </div>
            <div className="font-medium">
                <InputError
                    error={errors.vote}
                    message={errors?.vote?.message}
                />
            </div>

            <textarea
                {...register("content")}
                placeholder="Add a Review"
                className="w-full outline-none rounded-md bg-gray-200 p-2 mt-2 border border-gray-200 dark:border-white/10 dark:bg-white/10 hover:border-blue-500 dark:hover:border-blue-500"
            >
            </textarea>
            <span className="font-medium text-left text-gray-600 text-sm dark:text-gray-400">{`${content ? countWords(content) : "0"} words`}</span>
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