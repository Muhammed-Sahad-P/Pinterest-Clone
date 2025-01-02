"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../ui/NavbarItems/Logo";
import DesktopMenu from "../ui/NavbarItems/DesktopMenu";
import SearchBar from "../ui/NavbarItems/SearchBar";
import DesktopMenu1 from "../ui/NavbarItems/DesktopMenu1";
import AuthButtons from "../ui/NavbarItems/AuthButton";
import MobileMenu from "../ui/NavbarItems/MobileMenu";
import LoginModal from "../ui/NavbarItems/LoginModal";
import SignupModal from "../ui/NavbarItems/SignupModal";
import LoginedItems from "../ui/NavbarItems/loginedItems";
import MobileMenu1 from "../ui/NavbarItems/MobileMenu1";
import DesktopPublicMenu from "../ui/NavbarItems/DesktopPublicMenu";
import MobilePublicMenu from "../ui/NavbarItems/MobilePublicMenu";
import { FcMenu } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setIsLoginModalOpen, setIsSignupModalOpen } from "@/lib/store/features/userSlice";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const { isLoginModalOpen, isSignupModalOpen } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();


    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("user");
        setIsLoggedIn(!!token);
    }, []);

    if (isLoggedIn === null) {
        return null;
    }

    const isDesktopMenuPage = ["/u/home", "/p/watch", "/p/explore", "/p/today", "/u/create", "/u/profile"].includes(pathname);

    return (
        <nav className="bg-white dark:bg-darkBg py-6 z-50 sticky top-0">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center space-x-4">
                    <Logo />
                    {isLoggedIn ? null : (
                        <span
                            className="text-md font-bold text-[#E60023] font-oxygen cursor-pointer"
                            onClick={() => {
                                router.push("/home");
                            }}
                        >
                            Pinterest
                        </span>
                    )}
                    {isLoggedIn ? (
                        <div className="hidden md:block">
                            <DesktopMenu onSearchClick={() => { }} />
                        </div>
                    ) : (
                        <DesktopPublicMenu onSearchClick={() => { }} />
                    )}
                </div>

                {isDesktopMenuPage && <SearchBar />}

                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <LoginedItems />
                    ) : (
                        <>
                            <div className="hidden lg:block">
                                <DesktopMenu1 />
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <AuthButtons
                                    onLoginClick={() => dispatch(setIsLoginModalOpen(true))}
                                    onSignupClick={() => dispatch(setIsSignupModalOpen(true))}
                                />
                            </div>
                        </>
                    )}

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 md:hidden focus:outline-none hover:text-red-500"
                    >
                        <FcMenu size={24} />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                isLoggedIn ? (
                    <MobileMenu
                        onSearchClick={() => { }}
                        onLoginClick={() => dispatch(setIsLoginModalOpen(true))}
                        onSignupClick={() => dispatch(setIsSignupModalOpen(true))}
                    >
                    </MobileMenu>
                ) : (
                    <>
                        <MobilePublicMenu />
                        <MobileMenu1
                            onSearchClick={() => { }}
                            onLoginClick={() => dispatch(setIsLoginModalOpen(true))}
                            onSignupClick={() => dispatch(setIsSignupModalOpen(true))}
                        >
                        </MobileMenu1>
                    </>
                )

            )}
            {isLoginModalOpen && <LoginModal onClose={() => dispatch(setIsLoginModalOpen(false))} />}
            {isSignupModalOpen && <SignupModal onClose={() => dispatch(setIsSignupModalOpen(false))} />}
        </nav>
    );
};

export default Navbar;

