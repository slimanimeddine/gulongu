import { Logo } from "./logo";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, DiscordIcon, PlayStoreSVG, AppStoreSVG } from "./svgIcons";

export function Footer() {
    return (
        <footer className="capitalize px-20 bg-gray-50 dark:bg-zinc-950">
            <div className="flex gap-5 justify-between py-12 max-md:flex-col">
                <div className="flex flex-col gap-5">
                    <Logo />
                    <div className="flex gap-2 max-md:flex-col">
                        <Link href="">
                            <PlayStoreSVG />
                        </Link>
                        <Link href="">
                            <AppStoreSVG />
                        </Link>
                    </div>
                </div>
                <div className="text-zinc-500 dark:text-gray-100 text-lg font-medium grid grid-cols-2 gap-x-28 gap-y-3 max-md:grid-cols-1">
                    <Link href="">about us</Link>
                    <Link href="">contact us</Link>
                    <Link href="">announcements</Link>
                    <Link href="">jobs</Link>
                </div>
                <div className="">

                </div>
                <div className="flex gap-4 text-zinc-500 text-lg font-medium dark:text-gray-100">
                    <Link href="">
                        <FacebookIcon />
                    </Link>
                    <Link href="">
                        <TwitterIcon />
                    </Link>
                    <Link href="">
                        <DiscordIcon />
                    </Link>
                </div>
            </div>
            <hr />
            <div className="flex justify-between items-center py-4 text-zinc-500 max-md:flex-col gap-2 max-md:items-start dark:text-gray-100">
                <span>copyright © Gulongu 2023</span>
                <div className="flex justify-between items-center gap-2">
                    <Link href="">terms of service</Link>
                    <span className="pb-2">.</span>
                    <Link href="">privacy policy</Link>
                    <span className="pb-2">.</span>
                    <Link href="">cookie policy</Link>
                </div>
            </div>
        </footer>
    )
}