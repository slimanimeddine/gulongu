import { Popover, Transition } from '@headlessui/react'
import Link from "next/link";
import { Fragment } from 'react'
import { SearchBarMd } from './searchBar';
import { BurgerMenuIcon } from './svgIcons';

export function BurgerMenu() {
    return (
        <Popover as="div">
            <Popover.Button className="bg-gray-100 rounded-full p-3 hover:bg-gray-200 outline-none dark:bg-zinc-700 dark:hover:bg-black hidden max-md:block">
                <BurgerMenuIcon />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Popover.Panel className="flex flex-col gap-2 py-4 justify-between absolute top-[73px] max-md:rounded-none right-0 bg-white rounded-md shadow-lg w-full ring-1 ring-black ring-opacity-5 dark:bg-zinc-800">
                    <div className="flex justify-center px-5">
                        <SearchBarMd />
                    </div>
                    <Link className="px-5 py-1 capitalize text-lg font-semibold outline-none hover:bg-gray-100 dark:hover:bg-zinc-700" href="/series">series</Link>
                    <Link className="px-5 py-1 capitalize text-lg font-semibold outline-none hover:bg-gray-100 dark:hover:bg-zinc-700" href="/bookmarks">bookmarks</Link>
                </Popover.Panel>
            </Transition>
        </Popover>
    )

}