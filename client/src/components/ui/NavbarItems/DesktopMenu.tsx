import React from "react";

interface DesktopMenuProps {
    onSearchClick: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ onSearchClick }) => {
    return (
        <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex space-x-6 ml-8">
                <button onClick={onSearchClick} className="text-black hover:text-red-500 font-medium">
                    Today
                </button>
                <button onClick={onSearchClick} className="text-black hover:text-red-500 font-medium">
                    Watch
                </button>
                <button onClick={onSearchClick} className="text-black hover:text-red-500 font-medium">
                    Explore
                </button>
            </div>
        </div>
    )
};

export default DesktopMenu;
