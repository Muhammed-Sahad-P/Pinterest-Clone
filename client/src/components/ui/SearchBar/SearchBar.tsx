"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setQuery } from "@/lib/store/features/searchSlice";
import { search } from "@/lib/store/thunks/search-thunk";
import Image from "next/image";
import Link from "next/link";


const SearchBar: React.FC = () => {
    const [query, setQueryState] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch<AppDispatch>();

    const { results, isLoading, error } = useSelector(
        (state: RootState) => state.search
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQueryState(newQuery);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            if (newQuery.length > 0) {
                setShowSuggestions(true);
                dispatch(setQuery(newQuery));
                dispatch(search({ query: newQuery }));
            } else {
                setShowSuggestions(false);
            }
        }, 300);

        setDebounceTimeout(timeout);
    };

    const handleClearSuggestions = () => {
        setShowSuggestions(false);
        setQueryState("");
        dispatch(setQuery(""));
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(e.target as Node)
        ) {
            setShowSuggestions(false);
        }
    };

    const handleRecentSearchClick = (searchQuery: string) => {
        setQueryState(searchQuery);
        dispatch(setQuery(searchQuery));
        dispatch(search({ query: searchQuery }));
        setShowSuggestions(false);
    };

    const handleClearRecentSearch = (searchQuery: string) => {
        setRecentSearches((prevSearches) =>
            prevSearches.filter((item) => item !== searchQuery)
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query) {
            if (!recentSearches.includes(query)) {
                setRecentSearches((prevSearches) => [query, ...prevSearches]);
            }
            dispatch(search({ query }));
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
                    onKeyDown={handleKeyDown}
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
                    {isLoading ? (
                        <p className="px-4 py-2">Loading...</p>
                    ) : error ? (
                        <p className="px-4 py-2 text-red-500">{error}</p>
                    ) : (
                        <ul>
                            {recentSearches.length > 0 && (
                                <div>
                                    <h4 className="font-semibold px-4 py-2">Recent Searches</h4>
                                    {recentSearches.map((searchQuery, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                            onClick={() => handleRecentSearchClick(searchQuery)}
                                        >
                                            {searchQuery}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClearRecentSearch(searchQuery);
                                                }}
                                                className="text-red-500 text-sm"
                                            >
                                                <IoClose />
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            )}

                            {results?.length > 0 ? (
                                results?.map((result, index) => (
                                    <div key={index}>
                                        <Link href={`/pin/${result._id}`}>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-4">
                                                <Image
                                                    src={result.imageUrl || "/default-pin-image.jpg"}
                                                    alt={result.title || "No title available"}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    width={40}
                                                    height={40}
                                                />
                                                <span>{result.title || "Untitled"}</span>
                                            </li>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <li className="px-4 py-2">No results found</li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
