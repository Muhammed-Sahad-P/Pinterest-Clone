"use client";
import React, { useState } from "react";
import Image from "next/image";
import Signin from "@/app/(auth)/signin/[[...signin]]/page";
import Signup from "@/app/(auth)/signup/[[...signup]]/page";
const Navbar: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleSignupModal = () => {
        setIsSignupModalOpen(!isSignupModalOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearchClose = () => {
        setIsSearchVisible(false);
    };

    return (
        <div>
            <nav className="bg-white dark:bg-darkBg shadow z-50">
                <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/pinterest.png"
                                alt="Pinterest Logo"
                                className="h-8 w-8"
                                width={32}
                                height={32}
                            />
                            <span className="text-2xl font-bold text-[#E60023] font-oxygen">
                                Pinterest
                            </span>
                        </div>

                        <div className="hidden lg:flex space-x-6">
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Today
                            </button>
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Watch
                            </button>
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Explore
                            </button>
                        </div>
                    </div>

                    {isSearchVisible && (
                        <div className="hidden lg:flex items-center relative w-96">
                            <input
                                type="text"
                                placeholder="Search for easy dinners, fashion, etc."
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearchClose}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                About
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Business
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Blog
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={toggleLoginModal}
                                className="bg-[#E60023] text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
                            >
                                Log in
                            </button>
                            <button
                                onClick={toggleSignupModal}
                                className="bg-gray-200 text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>

                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 focus:outline-none hover:text-red-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-darkBg shadow-md">
                        <div className="flex flex-col space-y-4 p-4">
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Today
                            </button>
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Watch
                            </button>
                            <button
                                onClick={handleSearchClick}
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Explore
                            </button>
                            {isSearchVisible && (
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        placeholder="Search for easy dinners, fashion, etc."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSearchClose}
                                        className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                About
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Business
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Blog
                            </a>
                            <button
                                onClick={toggleLoginModal}
                                className="bg-[#E60023] text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 w-full"
                            >
                                Log in
                            </button>
                            <button
                                onClick={toggleSignupModal}
                                className="bg-gray-200 text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300 w-full"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:w-96">
                        <Signin />
                        <button
                            onClick={toggleLoginModal}
                            className="absolute top-2 right-2 text-gray-600"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

            {isSignupModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:w-96">
                        <Signup />
                        <button
                            onClick={toggleSignupModal}
                            className="absolute top-2 right-2 text-gray-600"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
