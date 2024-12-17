import React from "react";

interface AuthButtonsProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
    onLoginClick,
    onSignupClick,
}) => (
    <div className="flex space-x-4">
        <button
            onClick={onLoginClick}
            className="bg-[#E60023] text-white text-base p-2 rounded-full hover:bg-red-600 transition duration-300"
        >
            Log in
        </button>
        <button
            onClick={onSignupClick}
            className="bg-gray-200 text-black text-base p-2 rounded-full hover:bg-gray-300 transition duration-300"
        >
            Sign up
        </button>
    </div>

);

export default AuthButtons;
