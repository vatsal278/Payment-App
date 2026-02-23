"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 bg-gray-50 dark:bg-zinc-900 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-gray-500 dark:text-gray-400"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-6 h-6 animate-in zoom-in spin-in-90 duration-300" />
            ) : (
                <Moon className="w-6 h-6 animate-in zoom-in spin-in-90 duration-300" />
            )}
        </button>
    );
}
