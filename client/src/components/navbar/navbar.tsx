"use client";
import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white dark:bg-darkBg z-50 sm:z-40">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-5 px-6">

                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/pinterest.png"
                            alt="Pinterest Logo"
                            className="h-8 w-8"
                            width={32}
                            height={32}
                        />
                        <span className="text-2xl font-bold text-[#E60023] font-poppins">
                            Pinterest
                        </span>
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium"
                        >
                            Today
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium"
                        >
                            Watch
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium"
                        >
                            Explore
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium hidden md:block"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium hidden md:block"
                        >
                            Business
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-red-500 font-medium hidden md:block"
                        >
                            Blog
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-[#E60023] text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">
                            Log in
                        </button>
                        <button className="bg-gray-200 text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
