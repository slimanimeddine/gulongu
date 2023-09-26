import { RadioGroup } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CaretDownIcon, CaretUpIcon, XSquaredIcon, XIcon } from './svgIcons'
import { useGenres } from '@/hooks/useGenres'
import { IGenre } from '@/types/genreType'
import { useRouter } from 'next/router'

export function SeriesSortFilter() {
    const router = useRouter()
    // sort state
    const [sort, setSort] = useState<"name" | "chapters" | "rating">('name')

    // filter state
    const {
        data,
    } = useGenres()
    const genres = data ?? []

    const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([])
    const [query, setQuery] = useState('')
    const filteredGenres =
        query === ''
            ? genres.filter(genre => !selectedGenres.map(genre => genre.id).includes(genre.id))
            : genres.filter(genre => !selectedGenres.map(genre => genre.id).includes(genre.id)).filter((genre) =>
                genre.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    // put state in url 
    useEffect(() => {
        const sortBySegment = `?sortBy=${sort}`
        const filterSegment = `&filter=${selectedGenres.map(item => item.name).join(',')}`
        router.push(`${sort ? sortBySegment : ""}${selectedGenres.length > 0 ? filterSegment : ""}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, setSort, selectedGenres, setSelectedGenres])
    return (
        <>
            {/* radio group */}
            <RadioGroup value={sort} onChange={setSort}>
                <RadioGroup.Label className="capitalize text-lg font-semibold">sort by</RadioGroup.Label>
                <div className="flex justify-start gap-5 my-3">
                    <RadioGroup.Option value="name">
                        {({ checked }) => (
                            <span className={`${checked ? 'bg-white text-sky-500 font-medium rounded-md dark:bg-gray-900' : ''} capitalize p-2 cursor-pointer`}>Name</span>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="chapters">
                        {({ checked }) => (
                            <span className={`${checked ? 'bg-white text-sky-500 font-medium rounded-md dark:bg-gray-900' : ''} capitalize p-2 cursor-pointer`}>Chapters</span>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="rating">
                        {({ checked }) => (
                            <span className={`${checked ? 'bg-white text-sky-500 font-medium rounded-md dark:bg-gray-900' : ''} capitalize p-2 cursor-pointer`}>Rating</span>
                        )}
                    </RadioGroup.Option>
                </div>
            </RadioGroup>
            {/* combobox */}
            <Combobox<IGenre> value={selectedGenres} onChange={setSelectedGenres} multiple>
                <>
                    <Combobox.Label className="capitalize text-lg font-semibold block">genres</Combobox.Label>
                    <div className="relative mt-3">

                        <div className="flex justify-between items-center w-full bg-white capitalize h-[50px] px-3 rounded-lg my-0 outline-none hover:shadow-md dark:bg-[#3B3B3B]">
                            <div className="flex justify-start items-center w-full">
                                {selectedGenres.length > 0 && (
                                    <ul
                                        className="flex justify-center items-center gap-1"
                                    >
                                        {selectedGenres.map(({ name, id }) => (
                                            <li
                                                className="flex justify-center items-center gap-1 p-[3px] capitalize text-xs w-fit font-medium rounded-md bg-gray-100 outline-none hover:cursor-pointer dark:bg-stone-400"
                                                key={id}
                                            >
                                                <span>{name}</span>
                                                <button
                                                    onClick={() => setSelectedGenres(selectedGenres.filter(genre => genre.id !== id))}
                                                >
                                                    <XSquaredIcon />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <Combobox.Input
                                    as="input"
                                    className="w-full ml-1 outline-none"
                                    placeholder="Select"
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                {
                                    selectedGenres.length > 0 &&
                                    <button
                                        onClick={() => setSelectedGenres([])}
                                        className="h-fit rounded-full hover:bg-gray-200 dark:hover:bg-stone-600 cursor-pointer"
                                    >
                                        <XIcon />
                                    </button>
                                }
                                <Combobox.Button
                                    className="h-fit rounded-full hover:bg-gray-200 dark:hover:bg-stone-600"
                                >
                                    {({ open }) => (
                                        (open && selectedGenres.length !== genres.length) ?
                                            <CaretUpIcon />
                                            : <CaretDownIcon />
                                    )}

                                </Combobox.Button>
                            </div>
                        </div>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            {
                                selectedGenres.length === genres.length ?
                                    (
                                        <div></div>
                                    )
                                    : (
                                        <Combobox.Options as="div" static className="absolute py-2 shadow-md flex flex-col justify-start bg-white w-full rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                                            {filteredGenres.length === 0 && query !== '' ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                filteredGenres.map((genre) => (
                                                    <Combobox.Option as="div" className="capitalize text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600" key={genre.id} value={genre}>
                                                        {genre.name}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </Combobox.Options>
                                    )
                            }
                        </Transition>
                    </div>
                </>
            </Combobox>
        </>
    )
}