"use client";
import React, { useState, useEffect } from "react";
import { CgOptions } from "react-icons/cg";
import { IoIosStar } from "react-icons/io";
import { Button } from "../button";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchSavedPins, saveUnsavePin } from "@/lib/store/thunks/save-thunk";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import ActionButton from "@/components/ui/user-home/ActionButton";
import { MdEdit, MdOutlineFileUpload } from "react-icons/md";
import { Pin } from "@/lib/types";
import { toast } from "sonner";

export default function UserPinProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const pins = useAppSelector((state: RootState) => state.save.savedPins);
    const [activeButton, setActiveButton] = useState<"favorites" | "createdByYou" | null>(null);

    const handleButtonClick = (button: "favorites" | "createdByYou") => {
        if (activeButton === button) {
            setActiveButton(null);
        } else {
            setActiveButton(button);
        }
    };

    useEffect(() => {
        dispatch(fetchSavedPins());
    }, [dispatch]);

    const handleSavePin = async (pinId: string) => {
        try {
            const response = await dispatch(saveUnsavePin({ pinId })).unwrap();
            dispatch(fetchSavedPins());
            toast(response.message);
        } catch (error) {
            toast.error((error as { message: string }).message || "Pin already saved" || "Pin removed from saved");
        }
    };

    return (
        <div className="px-4 sm:px-8 lg:px-16">
            <div className="mt-10 flex flex-wrap items-center gap-4 text-[16px] sm:text-[18px] mx-auto max-w-screen-xl font-semibold">
                <div className="flex items-center">
                    <CgOptions size={25} />
                </div>

                <Button
                    onClick={() => handleButtonClick("favorites")}
                    className={`flex items-center gap-2 ${activeButton === "favorites" ? "bg-black text-white" : "bg-white text-black"
                        } rounded-3xl border px-4 py-2`}
                >
                    <IoIosStar
                        className={`transition-all duration-300 ${activeButton === "favorites" ? "text-white" : "text-black"
                            }`}
                    />
                    <span>Favorites</span>
                </Button>

                <Button
                    onClick={() => handleButtonClick("createdByYou")}
                    className={`flex items-center gap-2 ${activeButton === "createdByYou" ? "bg-black text-white" : "bg-white text-black"
                        } rounded-3xl border px-4 py-2`}
                >
                    Created by you
                </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
                {pins?.length > 0 ? (
                    pins?.map((pin: Pin, i) => {
                        if (!pin?.pinId || !pin.pinId._id) {
                            return null;
                        }
                        return (
                            <div
                                key={i}
                                className="relative group overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-[150px] h-[275px]"
                            >
                                <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
                                    {pin?.pinId?.imageUrl && (
                                        <Image
                                            className="w-full h-full object-cover"
                                            src={pin.pinId.imageUrl}
                                            alt="Pin"
                                            width={300}
                                            height={300}
                                        />
                                    )}

                                    <div className="absolute top-4 right-3 hidden group-hover:block">
                                        <ActionButton
                                            onClick={() => handleSavePin(pin.pinId._id)} // Safe access of pinId
                                            className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-2 rounded-full text-sm sm:text-sm"
                                        >
                                            {pins.some((savedPin) => savedPin.pinId._id === pin.pinId._id)
                                                ? "Remove"
                                                : "Save"}
                                        </ActionButton>
                                    </div>

                                    <div className="absolute bottom-4 right-4 gap-2 group-hover:flex hidden">
                                        <ActionButton
                                            className="p-2 bg-white rounded-full text-center text-sm sm:text-lg shadow-md hover:shadow-lg"
                                            icon={MdEdit}
                                        />
                                        <ActionButton
                                            className="p-2 bg-white rounded-full text-center text-sm sm:text-lg shadow-md hover:shadow-lg"
                                            icon={MdOutlineFileUpload}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 w-full">No saved pins yet!</p>
                )}
            </div>
        </div>
    );
}
