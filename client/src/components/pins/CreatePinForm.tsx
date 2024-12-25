"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBoards, createBoard } from "@/lib/store/thunks/board-thunk";
import { createPin } from "@/lib/store/thunks/pin-thunk";

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

    useEffect(() => {
        setIsMounted(true);
        dispatch(fetchBoards());
    }, [dispatch]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
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
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-5 text-center">Create New Pin</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter pin title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter pin description"
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select Board
                        </label>
                        {boardLoading ? (
                            <p className="text-sm text-gray-500">Loading boards...</p>
                        ) : (
                            <select
                                value={selectedBoard}
                                onChange={(e) => setSelectedBoard(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="">Select a board</option>
                                {boards?.data?.map((board) => (
                                    <option key={board._id} value={board._id}>
                                        {board.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Or Create a New Board
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Create New Board
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            disabled={pinLoading}
                        >
                            {pinLoading ? "Creating Pin..." : "Create Pin"}
                        </button>
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
                            <textarea
                                value={newBoardDescription}
                                onChange={(e) => setNewBoardDescription(e.target.value)}
                                placeholder="Enter board description"
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={3}
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
                                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                disabled={!newBoardName.trim() || !newBoardDescription.trim()}
                            >
                                Create Board
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePinForm;
