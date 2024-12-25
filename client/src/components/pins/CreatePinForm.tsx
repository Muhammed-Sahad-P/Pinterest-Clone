"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBoards, createBoard } from "@/lib/store/thunks/board-thunk";
import { createPin } from "@/lib/store/thunks/pin-thunk";
import Image from "next/image";

const CreatePinForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { boards, loading: boardLoading } = useSelector(
        (state: RootState) => state.board
    );
    const { loading: pinLoading } = useSelector((state: RootState) => state.pin);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedBoard, setSelectedBoard] = useState("");
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        dispatch(fetchBoards());
    }, [dispatch]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setIsFileSelected(true);
        }
    };

    const handleCreateBoard = async () => {
        if (!newBoardName.trim() || !newBoardDescription.trim()) {
            alert("Please provide both board name and description.");
            return;
        }

        const response = await dispatch(
            createBoard({ name: newBoardName, description: newBoardDescription })
        );

        if (response.meta.requestStatus === "fulfilled") {
            dispatch(fetchBoards());
            setSelectedBoard(response.payload._id);
            setNewBoardName("");
            setNewBoardDescription("");
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !image || !selectedBoard) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("boardId", selectedBoard);

        const response = await dispatch(createPin(formData));
        if (response.meta.requestStatus === "fulfilled") {
            alert("Pin created successfully!");
            setTitle("");
            setDescription("");
            setImage(null);
            setSelectedBoard("");
        }
    };

    if (!isMounted) return null;

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-white">
            <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-5 text-center">Create Pin</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex space-x-8">
                        <div className="flex-1">
                            {image && (
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Selected Preview"
                                        className="w-full h-64 object-cover rounded-md"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-black">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isFileSelected ? "blur-none" : "blur-sm"
                                            }`}
                                        placeholder="Add a title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-black">Description</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isFileSelected ? "blur-none" : "blur-sm"
                                            }`}
                                        placeholder="Add a detailed description"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className=" text-sm text-black">Board</label>
                                    {boardLoading ? (
                                        <p className="text-sm text-gray-500">Loading boards...</p>
                                    ) : (
                                        <select
                                            value={selectedBoard}
                                            onChange={(e) => setSelectedBoard(e.target.value)}
                                            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isFileSelected ? "blur-none" : "blur-sm"
                                                }`}
                                            required
                                        >
                                            <option value="">Choose a board</option>
                                            {boards?.data?.map((board) => (
                                                <option key={board._id} value={board._id}>
                                                    {board.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm text-black ">Create a New Board</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full py-2 px-4 bg-[#E60023] text-white rounded-xl hover:bg-[#E60023]/80"
                                    >
                                        Create New Board
                                    </button>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-[#E60023] text-white rounded-xl hover:bg-[#E60023]/80"
                                        disabled={pinLoading}
                                    >
                                        {pinLoading ? "Creating Pin..." : "Create Pin"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-auto"
                            required
                        />
                    </div>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">Create New Board</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Board Name</label>
                            <input
                                type="text"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                placeholder="Enter board name"
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Board Description</label>
                            <input
                                type="text"
                                value={newBoardDescription}
                                onChange={(e) => setNewBoardDescription(e.target.value)}
                                placeholder="Enter board description"
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateBoard}
                                className="py-2 px-4 bg-[#E60023] text-white rounded-md hover:bg-[#E60023]/80"
                                disabled={boardLoading}
                            >
                                {boardLoading ? "Creating..." : "Create Board"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePinForm;
