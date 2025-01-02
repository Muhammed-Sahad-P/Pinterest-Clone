"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPinById } from "@/lib/store/thunks/pin-thunk";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { MdOutlineFileUpload } from "react-icons/md";
import ActionButton from "../user-home/ActionButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function DynamicPin() {
    const { pinId } = useParams<{ pinId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedPin, loading, error } = useSelector((state: RootState) => state.pin);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (pinId) {
            dispatch(fetchPinById(pinId));
        }
    }, [dispatch, pinId]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSave = () => {
    };

    const handleLike = () => {
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!selectedPin) {
        return <div>No pin found with ID {pinId}</div>;
    }

    return (
        <div className="flex items-center justify-center bg-white p-6">
            <div className="bg-white border w-full md:w-[700px] rounded-2xl shadow-lg flex">
                <div className="w-1/2 p-4">
                    {selectedPin.imageUrl && (
                        <Image
                            src={selectedPin.imageUrl}
                            alt="Pin Image"
                            width={500}
                            height={500}
                            className="rounded-2xl shadow-md"
                        />
                    )}
                </div>
                <div className="w-1/2 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex space-x-6">
                            <FavoriteBorderIcon className="text-black mt-3 cursor-pointer" fontSize="medium" titleAccess="Like" onClick={handleLike} />
                            <ActionButton
                                className="mt-3 text-[25px]"
                                icon={MdOutlineFileUpload}
                                title="Share"
                            />
                            <ActionButton
                                className="mt-3 text-[25px]"
                                icon={SlOptions}
                                title="Download Image"
                            />
                        </div>
                        <ActionButton
                            className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-5 py-3 rounded-full text-sm sm:text-base"
                            onClick={handleSave}
                            title="Save Pin"
                        >
                            Save
                        </ActionButton>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <div className="text-sm font-semibold">User1:</div>
                            <p className="ml-2 text-sm">Great Pin!</p>
                        </div>
                        <div className="flex items-center">
                            <div className="text-sm font-semibold">User2:</div>
                            <p className="ml-2 text-sm">Love this! So creative.</p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={handleCommentChange}
                                className="border p-2 rounded-md w-full"
                            />
                            <button
                                onClick={() => { }}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
