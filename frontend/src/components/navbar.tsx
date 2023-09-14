import Link from "next/link";
import { UserDropdown } from "./userDropdown";
import { BurgerMenu } from "./burgerMenu";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { usePathname } from 'next/navigation'

export function Navbar() {
    const pathname = usePathname()
    const routes = ["/signUp", "/login"]
    const hide = routes.includes(pathname)

    return (
        <nav className="flex justify-between items-center py-3 px-10 shadow-md dark:bg-zinc-950 dark:text-white">
            <div className="flex justify-between items-center gap-4">
                <Logo />
                {!hide && <Link className="capitalize text-lg font-semibold outline-none max-md:hidden" href="/series">series</Link>}
                {!hide && <Link className="capitalize text-lg font-semibold outline-none max-md:hidden" href="/bookmarks">bookmarks</Link>}
            </div>
            <div className="flex justify-between items-center gap-4">
                {!hide && <SearchBar />}
                {!hide && <UserDropdown />}
                {!hide && <BurgerMenu />}
            </div>
        </nav>
    )
}