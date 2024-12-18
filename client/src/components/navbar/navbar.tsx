"use client";
import React, { useState } from "react";
import Logo from "../ui/NavbarItems/Logo";
import DesktopMenu from "../ui/NavbarItems/DesktopMenu";
import SearchBar from "../ui/NavbarItems/SearchBar";
import DesktopMenu1 from "../ui/NavbarItems/DesktopMenu1";
import AuthButtons from "../ui/NavbarItems/AuthButton";
import MobileMenu from "../ui/NavbarItems/MobileMenu";
import LoginModal from "../ui/NavbarItems/LoginModal";
import SignupModal from "../ui/NavbarItems/SignupModal";


const Navbar: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <nav className="bg-white dark:bg-darkBg  z-50 sticky top-0">
            <div className="container mx-auto flex items-center justify-between py-5 px-2 md:px-6">
                <div className="flex">

                    <Logo />
                    <DesktopMenu onSearchClick={() => setIsSearchVisible(true)} />
                </div>


                {isSearchVisible && <SearchBar onClose={() => setIsSearchVisible(false)} />}
                <div className="flex items-center">
                    <DesktopMenu1 />

                    <div className="hidden md:flex space-x-8">
                        <AuthButtons
                            onLoginClick={() => setIsLoginModalOpen(true)}
                            onSignupClick={() => setIsSignupModalOpen(true)}
                        />
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 md:hidden focus:outline-none hover:text-red-500"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <MobileMenu
                    onSearchClick={() => setIsSearchVisible(true)}
                    onLoginClick={() => setIsLoginModalOpen(true)}
                    onSignupClick={() => setIsSignupModalOpen(true)}
                />
            )}

            {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
            {isSignupModalOpen && <SignupModal onClose={() => setIsSignupModalOpen(false)} />}
        </nav>
    );
};


export default Navbar;
