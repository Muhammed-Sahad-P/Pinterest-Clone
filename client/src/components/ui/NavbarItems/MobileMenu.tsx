import React from "react";
interface MobileMenuProps {
    onSearchClick: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
    children: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    children,
    onSearchClick,
}) => (
    <div className="flex flex-col space-y-4 p-4 sm:hidden">
        <button onClick={onSearchClick} className="text-gray-700 hover:text-red-500 font-medium">
            Home
        </button>
        <button onClick={onSearchClick} className="text-gray-700 hover:text-red-500 font-medium">
            Watch
        </button>
        <button onClick={onSearchClick} className="text-gray-700 hover:text-red-500 font-medium">
            Explore
        </button>
        {children}
    </div>
);

export default MobileMenu;
