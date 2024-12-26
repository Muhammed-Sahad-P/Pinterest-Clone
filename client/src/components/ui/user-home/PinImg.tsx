import React from "react";
import Image from "next/image";
import { MdKeyboardArrowDown, MdOutlineFileUpload } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import ActionButton from "@/components/ui/user-home/ActionButton";
import { Pin } from "@/lib/types";

interface PinImageWithButtonsProps {
    pin: Pin;
}

const PinImag: React.FC<PinImageWithButtonsProps> = ({ pin }) => {
    return (
        <div className="relative group mt-4">
            <div className="relative w-full">
                <Image
                    className="object-cover rounded-2xl w-full"
                    src={pin.imageUrl}
                    alt={`Pin ${pin._id}`}
                    width={500}
                    height={300}
                />

                <ActionButton
                    className="absolute top-4 left-2 bg-transparent text-white px-3 py-2 rounded-full text-sm sm:text-base flex items-center hover:bg-[#665b5b] hover:bg-opacity-40 hover:backdrop-blur-none"
                    icon={MdKeyboardArrowDown}
                >
                    <span className="font-semibold">Profile</span>
                </ActionButton>



                <ActionButton
                    className="absolute top-4 right-3 bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-3 rounded-full text-sm sm:text-base"
                >
                    Save
                </ActionButton>

                <ActionButton
                    className="absolute bottom-2 right-2 p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                    icon={SlOptions}
                />

                <ActionButton
                    className="absolute bottom-2 right-14 p-2 sm:p-2 bg-white rounded-full text-center text-sm sm:text-lg"
                    icon={MdOutlineFileUpload}
                />
            </div>
        </div>
    );
};

export default PinImag;
