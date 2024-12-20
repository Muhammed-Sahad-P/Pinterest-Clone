"use client";

import Link from "next/link";

const DesktopMenu1 = () => {
    return (
        <div className="hidden lg:flex space-x-6 mr-8">
            <Link
                href="#"
                className="text-black hover:text-red-500 font-medium"
            >
                About
            </Link>
            <Link
                href="#"
                className="text-black hover:text-red-500 font-medium"
            >
                Business
            </Link>
            <Link
                href="#"
                className="text-black hover:text-red-500 font-medium"
            >
                Blog
            </Link>
        </div>
    )
};

export default DesktopMenu1;
