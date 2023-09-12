import { SearchIcon } from "./svgIcons"

export function SearchBar() {
    return (
        <div className="relative flex items-center max-md:hidden">
            <SearchIcon />
            <input
                type="text"
                placeholder="Search"
                className="outline-none font-medium focus:w-[250px] ease-in duration-300 block w-[180px] rounded-full placeholder-gray-500 bg-gray-100 dark:bg-zinc-800 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 dark:placeholder-gray-400"
            />
        </div>
    )
}

export function SearchBarMd() {
    return (
        <div className="relative flex items-center w-full">
            <SearchIcon />
            <input
                type="text"
                placeholder="Search"
                className="outline-none font-medium block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-zinc-700 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 dark:placeholder-gray-400"
            />
        </div>
    )
}