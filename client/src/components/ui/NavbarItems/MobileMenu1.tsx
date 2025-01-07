

import React from "react";
import AuthButtons from "./AuthButton";
interface MobileMenuProps {
    onSearchClick: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const MobileMenu1: React.FC<MobileMenuProps> = ({
    onLoginClick,
    onSignupClick,
}) => (
    <div className="flex flex-col p-2 items-center space-y-2 sm:hidden">
        <button className="text-black hover:text-red-500 font-medium">
            About
        </button>
        <button className="text-black hover:text-red-500 font-medium">
            Business
        </button>
        <button className="text-black hover:text-red-500 font-medium mb-3">
            Blog
        </button>
        <AuthButtons onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
    </div>
);

export default MobileMenu1;
