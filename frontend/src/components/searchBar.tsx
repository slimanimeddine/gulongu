import { useNovels } from "@/hooks/useNovels"
import { SearchIcon } from "./svgIcons"
import { filterFieldsIndex } from "@/helpers/filterFields"
import { INovel } from "@/types/novelType"
import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import Link from "next/link"

export function SearchBar() {
    const { data } = useNovels()
    const novels = data?.map((item: INovel) => filterFieldsIndex(item))

    const [selectedNovel, setSelectedNovel] = useState(novels?.at(0))
    const [query, setQuery] = useState('')

    const filteredNovels =
        query === ''
            ? novels
            : novels?.filter((novel) => {
                return novel.title.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <Combobox value={selectedNovel} onChange={setSelectedNovel}>
            <div className="relative flex items-center max-md:hidden">
                <SearchIcon />
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="outline-none font-medium focus:w-[250px] ease-in duration-300 block w-[180px] rounded-full placeholder-gray-500 bg-gray-100 dark:bg-zinc-800 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 dark:placeholder-gray-400"
                />
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options as="div" static className="absolute z-50 top-[73px] right-30py-2 shadow-md flex flex-col justify-start bg-white w-60 rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                    {filteredNovels?.map((novel) => (
                        <Combobox.Option as={Link} href={`novel/${novel.slug}`} className="capitalize text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600" key={novel.id} value={novel.title}>
                            {novel.title}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    )
}

export function SearchBarMd() {
    const { data } = useNovels()
    const novels = data?.map((item: INovel) => filterFieldsIndex(item))

    const [selectedNovel, setSelectedNovel] = useState(novels?.at(0))
    const [query, setQuery] = useState('')

    const filteredNovels =
        query === ''
            ? novels
            : novels?.filter((novel) => {
                return novel.title.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedNovel} onChange={setSelectedNovel}>
            <div className="relative flex items-center w-full">
                <SearchIcon />
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="outline-none font-medium block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-zinc-700 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 dark:placeholder-gray-400"
                />
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options as="div" static className="absolute z-50 top-[73px] right-30py-2 shadow-md flex flex-col justify-start bg-white w-full rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                    {filteredNovels?.map((novel) => (
                        <Combobox.Option as={Link} href={`novel/${novel.slug}`} className="capitalize text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600" key={novel.id} value={novel.title}>
                            {novel.title}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    )
}