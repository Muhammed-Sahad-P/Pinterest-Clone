"use client";
import { setShowModal } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import React from "react";

interface AuthButtonsProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
    onLoginClick,
    onSignupClick,
}) => {
    const dispatch = useAppDispatch();


    return (
        <div className="flex space-x-4">
            <button
                aria-label="Log in"
                onClick={() => { dispatch(setShowModal(true)); onLoginClick() }}
                className="bg-[#E60023] text-white text-base p-2 rounded-full hover:bg-red-600 transition duration-300"
            >
                Log in
            </button>
            <button
                aria-label="Sign up"
                onClick={() => { dispatch(setShowModal(false)); onSignupClick() }}
                className="bg-gray-200 text-black text-base p-2 rounded-full hover:bg-gray-300 transition duration-300"
            >
                Sign up
            </button>
        </div>

    )
};

export default AuthButtons;
