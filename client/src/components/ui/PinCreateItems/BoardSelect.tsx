"use client";

import React, { useState } from "react";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CreateBoardModal from "./CreateBoardModal";

interface BoardSelectProps {
    selectedBoard: string;
    onChange: (value: string) => void;
    onCreateBoard: (name: string, description: string) => Promise<void>;
    boardLoading: boolean;
}

const BoardSelect: React.FC<BoardSelectProps> = ({
    selectedBoard,
    onChange,
    onCreateBoard,
    boardLoading,
}) => {
    const { boards, loading } = useFetchBoards();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");

    const handleCreateBoard = async () => {
        if (newBoardName.trim() && newBoardDescription.trim()) {
            await onCreateBoard(newBoardName, newBoardDescription);
            setIsModalOpen(false);
            setNewBoardName("");
            setNewBoardDescription("");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-lg mx-auto space-y-2 px-4 sm:px-6">
            <label className="text-sm text-black md:text-base">Board</label>

            {loading ? (
                <p className="text-sm text-black md:text-base">Loading boards...</p>
            ) : (
                <>
                    <Select onValueChange={(value) => onChange(value)} value={selectedBoard}>
                        <SelectTrigger
                            className="w-full py-6 px-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700 placeholder-gray-400 sm:text-sm"
                        >
                            <SelectValue placeholder="Choose a board" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 overflow-y-auto rounded-lg shadow-md border border-gray-200 sm:max-h-48">
                            <SelectGroup>
                                <SelectLabel className="text-black md:text-sm lg:text-base">Boards</SelectLabel>
                                {boards?.map((board, index) => (
                                    <SelectItem
                                        key={index}
                                        value={board._id}
                                        className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm sm:text-base"
                                    >
                                        {board.name}
                                    </SelectItem>
                                ))}
                                <div className="py-2 px-3 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="text-[#E60023] text-sm sm:text-base hover:underline"
                                    >
                                        + Create New Board
                                    </button>
                                </div>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <CreateBoardModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        newBoardName={newBoardName}
                        setNewBoardName={setNewBoardName}
                        newBoardDescription={newBoardDescription}
                        setNewBoardDescription={setNewBoardDescription}
                        handleCreateBoard={handleCreateBoard}
                        boardLoading={boardLoading}
                    />
                </>
            )}
        </div>
    );
};

export default BoardSelect;
