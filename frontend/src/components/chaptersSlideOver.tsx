import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, MenuIcon, PhotoIcon, XIcon } from './svgIcons'

export default function ChaptersSlideOver({
    chapters,
    novel,
    setEnabled
}: {
    chapters: JSX.Element,
    novel: string,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className='text-gray-500'
            >
                <MenuIcon />
            </button>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-stone-500 dark:bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-stone-800 shadow-xl">
                                            <div className="relative flex-1">
                                                <div className="flex flex-col">
                                                    <div className="flex justify-start gap-2 items-center px-2 py-6 border-b">
                                                        <div className="border border-black rounded-lg">
                                                            <PhotoIcon width={29} height={40} />
                                                        </div>
                                                        <span className="font-semibold">{novel}</span>
                                                    </div>
                                                    <Disclosure>
                                                        {({ open }) => (
                                                            <>
                                                                <div className="w-full shadow-md shadow-slate-300 rounded-xl border dark:shadow-none dark:border-none dark:bg-stone-800">
                                                                    <Disclosure.Button
                                                                        className="flex justify-between items-center w-full gap-3 p-4"
                                                                        onClick={() => setEnabled(!open)}
                                                                    >
                                                                        <div className="flex items-center gap-2 text-lg font-semibold capitalize">
                                                                            <span className="bg-gray-200 rounded-md py-1 px-3 dark:bg-stone-700">1</span>
                                                                            <span>chapters</span>
                                                                        </div>
                                                                        {
                                                                            open
                                                                                ? <ChevronUpIcon />
                                                                                : <ChevronDownIcon />
                                                                        }
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel>
                                                                        {chapters}
                                                                    </Disclosure.Panel>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
