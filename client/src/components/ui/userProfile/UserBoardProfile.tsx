"use client";
import React, { useEffect, useState } from "react";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import Cookies from "js-cookie";
import { Board } from "@/lib/types";
import Image from "next/image";

export default function UserBoardProfile() {
    const { boards, loading, error } = useFetchBoards();
    const [userBoards, setUserBoards] = useState<Board[]>([]);

    const userId = Cookies.get("user");
    const user = JSON.parse(userId || "");

    useEffect(() => {
        if (user?.id && boards && boards.length > 0) {
            const filteredBoards = boards.filter((board) => board.createdBy === user.id);
            setUserBoards(filteredBoards);
        }
    }, [boards, user?.id]);

    return (
        <div className="px-4 sm:px-8 lg:px-16">
            <h1 className="text-2xl font-semibold mb-4">Your Boards</h1>
            <div className="flex flex-wrap">
                {loading ? (
                    <p className="text-gray-500">Loading boards...</p>
                ) : error ? (
                    <p className="text-red-500">Failed to fetch boards: {error}</p>
                ) : userBoards?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {userBoards?.map((board, index) => (
                            <div key={index} className="p-4 w-full sm:w-[250px] lg:w-[280px] xl:w-[320px] h-[250px] rounded-2xl">
                                <div className="relative w-full h-[150px] bg-white rounded-2xl overflow-hidden">
                                    <Image
                                        className="w-[186px] h-full object-cover"
                                        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                                        alt="Board Image"
                                        width={150}
                                        height={100}
                                    />
                                    <Image src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                                        alt="board img"
                                        width={50}
                                        height={50}
                                        className="bg-[#9b9b9b] opacity-50 w-[100px] h-[74px] absolute top-0 right-0" />
                                    <Image src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                                        alt="board img"
                                        width={50}
                                        height={50} className="bg-[#9b9b9b] opacity-50 w-[100px] h-[74px] absolute bottom-0 right-0" />
                                </div>
                                <h3 className="text-lg font-medium mt-2 ml-2">{board.name}</h3>
                                <p className="text-black text-[12px] ml-3">{board?.pins?.length} Pin</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-black">No boards found!</p>
                )}
            </div>
        </div>
    );
}
