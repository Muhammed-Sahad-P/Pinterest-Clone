"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DesktopPublicMenuProps {
    onSearchClick: () => void;
}

const DesktopPublicMenu: React.FC<DesktopPublicMenuProps> = () => {
    const currentRoute = usePathname();

    return (
        <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex space-x-1 ml-2">
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
        </div>
    );
};

export default DesktopPublicMenu;
