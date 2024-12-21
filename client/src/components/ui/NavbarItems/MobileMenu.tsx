import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../button";

interface MobileMenuProps {
    onSearchClick: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = () => {
    const currentRoute = usePathname();

    return (
        <div className="flex flex-col space-y-4 p-6 sm:hidden bg-white dark:bg-darkBg rounded-lg shadow-lg">
            <Link
                href="/u/home">
                <Button
                    className={`${currentRoute === "/u/home"
                        ? "bg-black text-white"
                        : "text-black hover:text-red-500"
                        } font-medium px-6 py-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                    Home
                </Button>
            </Link>

            <Link
                href="/p/explore">
                <Button
                    className={`${currentRoute === "/p/explore"
                        ? "bg-black text-white"
                        : "text-black hover:text-red-500"
                        } font-medium px-6 py-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                    Explore
                </Button>
            </Link>

            <Link
                href="/u/create">
                <Button
                    className={`${currentRoute === "/u/create"
                        ? "bg-black text-white"
                        : "text-black hover:text-red-500"
                        } font-medium px-6 py-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                    Create
                </Button>
            </Link>
        </div >
    );
};

export default MobileMenu;
