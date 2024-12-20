

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
    <div className="flex flex-col space-y-4 p-4">
        <button className="text-gray-700 hover:text-red-500 font-medium">
            About
        </button>
        <button className="text-gray-700 hover:text-red-500 font-medium">
            Business
        </button>
        <button className="text-gray-700 hover:text-red-500 font-medium">
            Blog
        </button>
        <AuthButtons onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
    </div>
);

export default MobileMenu1;
