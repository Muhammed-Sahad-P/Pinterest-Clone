

import React from "react";
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
        <button
            onClick={onLoginClick}
            className="bg-[#E60023] text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 w-full"
        >
            Log in
        </button>
        <button
            onClick={onSignupClick}
            className="bg-gray-200 text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300 w-full"
        >
            Sign up
        </button>
    </div>
);

export default MobileMenu1;
