"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdKeyboardArrowDown, MdOutlineFileUpload } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import ActionButton from "@/components/ui/user-home/ActionButton";
import { Pin } from "@/lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { saveUnsavePin } from "@/lib/store/thunks/save-thunk";
import { toast } from "sonner";
import Link from "next/link";

interface PinImageWithButtonsProps {
    pin: Pin;
}

const PinImag: React.FC<PinImageWithButtonsProps> = ({ pin }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

    const handleSavePin = async () => {
        try {
            const response = await dispatch(saveUnsavePin({ pinId: pin._id })).unwrap();
            toast(response.message);
        } catch (error) {
            toast.error((error as { message: string }).message || "Pin already saved");
        }
    };

    const handleDownloadImage = async () => {
        const response = await fetch(pin.imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `pin-${pin._id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsPopupOpen(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(pin.imageUrl);
        toast.success("Link copied to clipboard");
    };

    return (
        <div className="relative group cursor-pointer">
            <div className="relative w-full">
                <Link href={`/pin/${pin._id}`}>
                    <Image
                        className="object-cover rounded-2xl w-full mt-2"
                        src={pin.imageUrl}
                        alt={`Pin ${pin._id}`}
                        width={500}
                        height={300}
                    />
                </Link>
                <div className="absolute top-4 left-2 group-hover:block hidden">
                    <ActionButton
                        className="bg-transparent text-white px-3 py-2 rounded-full text-sm sm:text-base flex items-center hover:bg-[#665b5b] hover:bg-opacity-40 hover:backdrop-blur-none"
                        icon={MdKeyboardArrowDown}
                    >
                        <span className="font-semibold">Profile</span>
                    </ActionButton>
                </div>

                <div className="absolute top-4 right-3 group-hover:block hidden">
                    <ActionButton
                        className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-3 rounded-full text-sm sm:text-base"
                        onClick={handleSavePin}
                        title="Save Pin"
                    >
                        Save
                    </ActionButton>
                </div>

                <div className="absolute bottom-2 right-2 group-hover:block hidden">
                    <ActionButton
                        className="p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                        icon={SlOptions}
                        onClick={() => setIsPopupOpen((prev) => !prev)}
                        title="Download Image"
                    />
                    {isPopupOpen && (
                        <div
                            className="absolute z-50 flex flex-col bottom-10 right-0 w-56 bg-white border-gray-200 shadow-lg rounded-lg p-3"
                            onMouseLeave={() => setIsPopupOpen(false)}
                        >
                            <p className="text-gray-700 text-sm mb-2">
                                The pin was inspired by your recent activity
                            </p>
                            <div
                                className="bg-[#d6cbcb] text-black px-4 py-2 rounded-md hover:bg-[#E9E9E9] cursor-pointer text-center"
                                onClick={handleDownloadImage}
                            >
                                Download Image
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-2 right-14 group-hover:block hidden">
                    <div className="relative">
                        <ActionButton
                            className="p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                            icon={MdOutlineFileUpload}
                            onClick={() => setIsSharePopupOpen((prev) => !prev)}
                            title="Share"
                        />
                        {isSharePopupOpen && (
                            <div
                                className="absolute z-50 flex flex-col justify-start gap-6 w-[250px] sm:w-[300px] bg-white border-gray-200 shadow-lg rounded-lg p-3 top-[-250px] sm:top-[-200px] right-0"
                                onMouseLeave={() => setIsSharePopupOpen(false)}
                            >
                                <h3 className="text-lg font-semibold text-black mb-2 flex justify-center">Share</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <div
                                        className="flex flex-col items-center cursor-pointer"
                                        onClick={handleCopyLink}
                                    >
                                        <FaLink className="w-10 h-10 rounded-full" />
                                        <span className="text-sm text-black mt-1">Copy Link</span>
                                    </div>
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <Image
                                            src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                                            alt="WhatsApp Icon"
                                            className="w-10 h-10 rounded-full"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm text-black mt-1">WhatsApp</span>
                                    </div>
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <Image
                                            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                                            alt="Facebook Icon"
                                            className="w-10 h-10 rounded-full"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm text-black mt-1">Facebook</span>
                                    </div>
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <Image
                                            src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
                                            alt="X Icon"
                                            className="w-10 h-10 rounded-full"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm text-black mt-1">X</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinImag;
