"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DesktopMenuProps {
    onSearchClick: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = () => {
    const currentRoute = usePathname();

    return (
        <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex space-x-1 ml-2">
                <Link
                    href="/u/home"
                    className={`${currentRoute === "/u/home"
                        ? "bg-black text-white"
                        : "text-black hover:text-red-500"
                        } font-medium px-4 py-2 rounded-full`}
                >
                    Home
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

                <Link
                    href="/u/create"
                    className={`${currentRoute === "/u/create"
                        ? "bg-black text-white"
                        : "text-black hover:text-red-500"
                        } font-medium px-4 py-2 rounded-full`}
                >
                    Create
                </Link>
            </div>
        </div>
    );
};

export default DesktopMenu;
