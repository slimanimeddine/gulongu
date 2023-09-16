import { Popover, Transition } from '@headlessui/react'
import { ModeSwitch } from './modeSwitch'
import { Fragment } from 'react'
import Link from 'next/link'
import { UserCircle, UserIcon } from './svgIcons'
import { useUser } from '@/hooks/useUser'
import { useLogOut } from '@/hooks/useLogOut'

export function UserDropdown() {
    const { data: user } = useUser()

    const { logOut } = useLogOut()

    return (
        <Popover as="div">
            <Popover.Button className="bg-gray-100 rounded-full p-3 hover:bg-gray-200 outline-none dark:bg-zinc-700 dark:hover:bg-black">
                <UserIcon />
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
                <Popover.Panel className="absolute z-50 top-[73px] right-6 bg-white rounded-md shadow-lg w-80 border border-gray-300  dark:bg-zinc-800 dark:border-none max-md:w-full max-md:rounded-none max-md:absolute max-md:right-0">
                    <div className="flex justify-center">
                        {
                            !user?.id
                                ? <Link href={"/login"} className="hover:drop-shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-full py-[4px] w-44 my-4 mx-4 text-center">log in</Link>
                                : <div className="flex flex-col w-full">
                                    <div
                                        className="flex justify-start items-center gap-2 mt-2 text-gray-600 text-left font-semibold pl-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600 dark:text-gray-300"
                                    >
                                        <UserCircle />
                                        <span>slimanimeddine</span>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="text-left text-sm font-semibold pl-4 py-2 hover:bg-gray-100 dark:hover:bg-stone-600"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="text-left text-sm font-semibold pl-4 py-2 hover:bg-gray-100 dark:hover:bg-stone-600"
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        className="text-left text-sm font-semibold pl-4 py-2 hover:bg-gray-100 dark:hover:bg-stone-600"
                                        onClick={logOut}
                                    >
                                        Log out
                                    </button>
                                </div>
                        }
                    </div>
                    <div className="flex justify-between items-center p-2 font-medium border-t border-gray-300">
                        <span className='capitalize text-zinc-700 dark:text-gray-400'>mode</span>
                        <ModeSwitch />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}