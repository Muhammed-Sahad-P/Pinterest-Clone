import React from "react";

interface SearchBarProps {
    onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
    return (
        <div className="flex items-center relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <input
                type="text"
                placeholder="Search for easy dinners, fashion, etc."
                className="w-full px-4 py-2 sm:py-3 border border-[#E1E1E1] bg-[#E1E1E1] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
                onClick={onClose}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition duration-200"
            >
                ✕
            </button>
        </div>
    );
};

export default SearchBar;
