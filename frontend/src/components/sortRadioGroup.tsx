import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

export function SortRadioGroup() {
    const [sort, setSort] = useState<"name" | "chapters" | "rating">('name')
    return (
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
    )
}