import Link from "next/link"

export function ChapterLink({ 
    novelSlug, 
    ChapterSlug, 
    title, 
    created_at 
}: {
    novelSlug: string, 
    ChapterSlug: string, 
    title: string, 
    created_at: string 
}) {
    return (
        <Link
            href={`${novelSlug}/${ChapterSlug}`}
            className="flex flex-col border-b border-gray-400 pb-2 hover:bg-gray-200 dark:hover:bg-stone-700"
        >
            <span className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">{title}</span>
            <span className="text-sm text-gray-400 dark:text-gray-300">{created_at}</span>
        </Link>
    )
}