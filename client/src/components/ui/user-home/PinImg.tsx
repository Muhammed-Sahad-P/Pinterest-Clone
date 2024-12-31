"use client";
import React from "react";
import Image from "next/image";
import { MdKeyboardArrowDown, MdOutlineFileUpload } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import ActionButton from "@/components/ui/user-home/ActionButton";
import { Pin } from "@/lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { saveUnsavePin } from "@/lib/store/thunks/save-thunk";
import { toast } from "sonner";

interface PinImageWithButtonsProps {
    pin: Pin;
}

const PinImag: React.FC<PinImageWithButtonsProps> = ({ pin }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSavePin = async () => {
        try {
            const response = await dispatch(saveUnsavePin({ pinId: pin._id })).unwrap();
            toast(response.message);
        } catch (error) {
            toast.error((error as { message: string }).message || "Pin already saved");
        }
    };



    return (
        <div className="relative group cursor-pointer">
            <div className="relative w-full">
                <Image
                    className="object-cover rounded-2xl w-full mt-2"
                    src={pin.imageUrl}
                    alt={`Pin ${pin._id}`}
                    width={500}
                    height={300}
                />

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
                    >
                        Save
                    </ActionButton>
                </div>

                <div className="absolute bottom-2 right-2 group-hover:block hidden">
                    <ActionButton
                        className="p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                        icon={SlOptions}
                    />
                </div>

                <div className="absolute bottom-2 right-14 group-hover:block hidden">
                    <ActionButton
                        className="p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                        icon={MdOutlineFileUpload}
                    />
                </div>
            </div>
        </div>
    );
};

export default PinImag;
