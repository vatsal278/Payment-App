"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Wraps page content and adds sidebar offset only when the Navbar is visible.
 * On login/register pages or when not authenticated, the content uses the full width.
 */
export default function MainContent({ children }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const isAuthPage = ["/login", "/register"].includes(pathname) || !user;

    // Auth pages or loading screens use the full viewport — no sidebar offset, borders, or shadow
    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div
            className="flex flex-col min-h-screen bg-white dark:bg-black p-6 transition-colors duration-300 mx-auto relative md:ml-20 lg:ml-56"
        >
            {children}
        </div>
    );
}
