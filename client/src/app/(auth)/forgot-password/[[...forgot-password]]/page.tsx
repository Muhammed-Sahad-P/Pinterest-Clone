"use client";
import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "@/lib/store/thunks/user-thunks";
import { AppDispatch, RootState } from "@/lib/store";

export default function ForgotPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [heading, setHeading] = useState("Let’s find your Pinterest account");

    const { loading, error, forgetEmail } = useSelector((state: RootState) => state.user);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        const isValid = validateEmail(value);
        setIsValidEmail(isValid);

        if (isValid) {
            setHeading("Reset your password");
        } else {
            setHeading("Let’s find your Pinterest account");
        }
    };

    const clearInput = () => {
        setSearchTerm("");
        setIsValidEmail(false);
        setHeading("Let’s find your Pinterest account");
    };

    const handleSubmit = () => {
        if (isValidEmail) {
            dispatch(forgotPassword(searchTerm));
        }
    };

    return (
        <div className="flex flex-col items-center mt-8 min-h-screen px-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center">
                {heading}
            </h1>
            <p className="mt-5 text-sm sm:text-base text-center">
                What&apos;s your email, name, or username?
            </p>

            <div className="relative flex items-center mt-8 w-full max-w-sm sm:max-w-md">
                <FiSearch className="absolute left-3 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full px-10 py-2 sm:py-3 border border-gray-300 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                {searchTerm && (
                    <button
                        onClick={clearInput}
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isValidEmail && !loading && (
                <button
                    className="bg-[#E60023] text-white py-2 px-6 w-4/12 rounded-full mt-5 hover:bg-[#E60023]/80 transition duration-200"
                    onClick={handleSubmit}
                >
                    Send a password reset email
                </button>
            )}

            {loading && <p className="mt-5 text-gray-600">Sending email...</p>}
            {error && (
                <p className="mt-5 text-red-500">
                    {error || "Failed to send the reset email. Please try again."}
                </p>
            )}
            {forgetEmail && (
                <p className="mt-5 text-green-500">
                    Password reset email sent successfully to {forgetEmail}.
                </p>
            )}
        </div>
    );
}
