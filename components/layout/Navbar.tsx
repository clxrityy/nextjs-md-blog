import { ICONS } from "@/utils/icons";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-screen border-b drop-shadow-md">
            <div className="w-full flex flex-row gap-6 items-center justify-end py-2 px-4 relative">
                <Link href={"/"} className="absolute left-0 px-2 hover:text-blue-700 transition-colors duration-100 ease-in">
                    <ICONS.home className="text-2xl cursor-pointer" />
                </Link>
                <Link href="/blog/new" className="hover:text-blue-700 transition-colors duration-100 ease-in">
                    <ICONS.write className="text-2xl cursor-pointer" />
                </Link>
                <UserButton />
            </div>
        </nav>
    )
}