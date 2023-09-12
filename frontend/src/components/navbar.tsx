import Link from "next/link";
import { UserDropdown } from "./userDropdown";
import { BurgerMenu } from "./burgerMenu";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { useRouter } from 'next/router'

export function Navbar() {
    const router = useRouter()
    const asPath = router.asPath
    const routes = ["/login", "/signUp"]

    return (
        <nav className="flex justify-between items-center py-3 px-10 shadow-md dark:bg-zinc-950 dark:text-white">
            <div className="flex justify-between items-center gap-4">
                <Logo />
                {!routes.includes(asPath) && <Link className="capitalize text-lg font-semibold outline-none max-md:hidden" href="/series">series</Link>}
                {!routes.includes(asPath) && <Link className="capitalize text-lg font-semibold outline-none max-md:hidden" href="/bookmarks">bookmarks</Link>}
            </div>
            <div className="flex justify-between items-center gap-4">
                {!routes.includes(asPath) && <SearchBar />}
                {!routes.includes(asPath) && <UserDropdown />}
                {!routes.includes(asPath) && <BurgerMenu />}
            </div>
        </nav>
    )
}