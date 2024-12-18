import React from "react";
import Signin from "@/app/(auth)/signin/[[...signin]]/page";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full sm:w-96 relative">
            <Signin />
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600"
            >
                X
            </button>
        </div>
    </div>
);

export default LoginModal;