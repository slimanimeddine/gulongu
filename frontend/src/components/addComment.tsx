export function AddComment() {
    return (
        <div className="flex flex-col text-center gap-2 p-6 shadow-md shadow-slate-300 rounded-lg border w-full">
            
            <textarea
                name="content"
                id=""
                placeholder="Add a Comment"
                className="w-full outline-none rounded-md bg-gray-200 p-2 mt-2 border border-gray-200 dark:border-white/10 dark:bg-white/10 hover:border-blue-500 dark:hover:border-blue-500"
            >
            </textarea>
            <button
                className="bg-blue-800 rounded-full py-1 px-3 text-sm font-semibold text-white place-self-end"
            >
                Submit
            </button>
        </div>
    )
}