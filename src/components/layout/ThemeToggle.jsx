"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:scale-105"
        >
            {theme === "light" ? (
                <Sun size={18}/>
            ) : (
                <Moon size={18}/>
            )}
        </button>
    );
}