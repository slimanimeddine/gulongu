import { useState } from "react"

function Like() {
    return (
        <button
            type="button"
            className="inline-flex rounded-full p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
        >
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-600"
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

function Dislike() {
    return (
        <button
            type="button"
            className="inline-flex rounded-full p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
        >
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-600 rotate-180"
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

export function AddReview() {
    const [submit, setSubmit] = useState(true)
    return (
        <div className="flex flex-col text-center gap-2 p-6 shadow-md shadow-slate-300 rounded-lg border w-full">
            <span className="font-medium text-gray-800 text-sm dark:text-gray-400">Write a review</span>
            <span className="font-semibold text-lg">Enjoy Nine Star Hegemon Body Art?</span>
            <div className="flex justify-center items-center">
                <div className="flex justify-start items-center gap-6">
                    <Like />
                    <Dislike />
                </div>
            </div>
            <textarea
                name="content"
                id=""
                placeholder="Add a Review"
                className="w-full outline-none rounded-md bg-gray-200 p-2 mt-2 border border-gray-200 dark:border-white/10 dark:bg-white/10 hover:border-blue-500 dark:hover:border-blue-500"
            >
            </textarea>
            <span className="font-medium text-left text-gray-600 text-sm dark:text-gray-400">0 Words</span>
            <span className="font-medium text-left text-red-600 text-sm">Reviews must have a minimum of 100 words</span>
            <button
                className="bg-gray-300 rounded-full py-1 px-3 text-sm font-semibold text-gray-600 place-self-end"
                style={submit
                    ? {
                        backgroundColor: "rgb(29 78 216)",
                        color: "white"
                    } : {

                    }}
            >
                Submit
            </button>
        </div>
    )
}