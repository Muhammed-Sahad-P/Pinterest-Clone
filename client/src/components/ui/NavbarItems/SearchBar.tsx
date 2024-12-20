import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface SearchBarProps {
    onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
    return (
        <div className="flex-1 items-center relative w-full py-0 px-3">
            <div className="hidden sm:flex w-full items-center relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-8 sm:py-3 border border-[#F1F1F1] bg-[#F1F1F1] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <button
                    onClick={onClose}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition duration-200"
                >
                    <IoClose />
                </button>
            </div>
            <button
                onClick={onClose}
                className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-800 transition duration-200"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBar;
