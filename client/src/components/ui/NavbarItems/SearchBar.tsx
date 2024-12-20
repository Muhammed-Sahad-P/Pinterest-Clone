"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleClearSuggestions = () => {
        setShowSuggestions(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(e.target as Node)
        ) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchBarRef} className="flex-1 items-center relative w-full py-0 px-3">
            <div className="flex w-full items-center relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search"
                    className="w-full px-8 sm:py-3 border border-[#F1F1F1] bg-[#F1F1F1] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                {showSuggestions && (
                    <button
                        onClick={handleClearSuggestions}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition duration-200"
                    >
                        <IoClose />
                    </button>
                )}
            </div>

            {showSuggestions && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 1</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 2</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
