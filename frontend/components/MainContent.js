"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps page content and adds sidebar offset only when the Navbar is visible.
 * On login/register pages the content uses the full width.
 */
export default function MainContent({ children }) {
    const pathname = usePathname();
    const hideNav = ["/login", "/register"].includes(pathname);

    return (
        <div
            className={`flex flex-col min-h-screen bg-white dark:bg-black p-6 transition-colors duration-300 mx-auto relative border-x border-gray-100 dark:border-zinc-800 shadow-xl ${hideNav ? "" : "md:ml-20 lg:ml-56"
                }`}
        >
            {children}
        </div>
    );
}
