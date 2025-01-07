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
        <div className="flex items-center space-y-2 space-x-2 p-2 sm:hidden">
            <Link
                href="/u/home">
                <Button
                    className={`${currentRoute === "/u/home"
                        ? "bg-black text-white"
                        : "text-black bg-white"
                        } font-medium px-2 py-3 rounded-lg mt-2 p-2 transition-all duration-200 ease-in-out hover:bg-gray-100`}
                >
                    Home
                </Button>
            </Link>

            <Link
                href="/p/explore">
                <Button
                    className={`${currentRoute === "/p/explore"
                        ? "bg-black text-white"
                        : "text-black bg-white"
                        } font-medium px-2 py-3 rounded-lg p-2 transition-all duration-200 ease-in-out hover:bg-gray-100`}
                >
                    Explore
                </Button>
            </Link>

            <Link
                href="/u/create">
                <Button
                    className={`${currentRoute === "/u/create"
                        ? "bg-black text-white"
                        : "text-black bg-white"
                        } font-medium px-2 py-3 rounded-lg p-2 transition-all duration-200 ease-in-out hover:bg-gray-100`}
                >
                    Create
                </Button>
            </Link>
        </div >
    );
};

export default MobileMenu;
