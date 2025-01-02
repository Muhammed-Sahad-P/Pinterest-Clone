"use client";
import React from "react";
import Signup from "@/app/(auth)/signup/[[...signup]]/page";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Signin from "@/app/(auth)/signin/[[...signin]]/page";

interface ModalProps {
    onClose?: () => void;
}

const SignupModal: React.FC<ModalProps> = ({ onClose }) => {
    const { showModal } = useSelector((state: RootState) => state.user);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full sm:w-96 relative">
                {!showModal ? (

                    <Signup />
                ) : (
                    <Signin />
                )}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
                    ✕
                </button>
            </div>
        </div>
    );
};

export default SignupModal;
