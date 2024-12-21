"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobilePublicMenu = () => {
    const currentRoute = usePathname();

    return (
        <div className="flex flex-col space-y-4 p-4 sm:hidden">
            <Link
                href="/p/today"
                className={`${currentRoute === "/p/today"
                    ? "bg-black text-white"
                    : "text-black hover:text-red-500"
                    } font-medium px-4 py-2 rounded-full`}
            >
                Today
            </Link>

            <Link
                href="/p/watch"
                className={`${currentRoute === "/p/watch"
                    ? "bg-black text-white"
                    : "text-black hover:text-red-500"
                    } font-medium px-4 py-2 rounded-full`}
            >
                Watch
            </Link>

            <Link
                href="/p/explore"
                className={`${currentRoute === "/p/explore"
                    ? "bg-black text-white"
                    : "text-black hover:text-red-500"
                    } font-medium px-4 py-2 rounded-full`}
            >
                Explore
            </Link>
        </div>
    );
};

export default MobilePublicMenu;
