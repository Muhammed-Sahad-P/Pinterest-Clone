"use client";
import React from "react";
import Signup from "@/app/(auth)/signup/[[...signup]]/page";

interface ModalProps {
    onClose: () => void;
}

const SignupModal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full sm:w-96 relative">
                <Signup />
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
                    ✕
                </button>
            </div>
        </div>
    );
};

export default SignupModal;
