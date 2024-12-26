"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBoards, createBoard } from "@/lib/store/thunks/board-thunk";
import { createPin } from "@/lib/store/thunks/pin-thunk";
import { toast } from "sonner";
import PinFormField from "../ui/PinCreateItems/PinFormField";
import BoardSelect from "../ui/PinCreateItems/BoardSelect";
import ImageUpload from "../ui/PinCreateItems/ImageUpload";
import CreateBoardModal from "../ui/PinCreateItems/CreateBoardModal";

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
            toast("Please provide both board name and description", {
                description: "Both fields are required to create a board.",
            });
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
            toast("Board created successfully", {
                description: `Board "${newBoardName}" has been created.`,
            });
        }
    };

    const handlePinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !image || !selectedBoard) {
            toast("Please fill all fields.", {
                description: "Make sure to provide a title, description, board, and image.",
            });
            return;
        }

        const pinData = new FormData();
        pinData.append("title", title);
        pinData.append("description", description);
        pinData.append("image", image);
        pinData.append("boardId", selectedBoard);

        try {
            const response = await dispatch(createPin(pinData));

            if (response?.payload) {
                toast("Pin created successfully!", {
                    description: "Your pin has been created.",
                });
            } else {
                toast("Pin creation failed.", {
                    description: "There was an error creating the pin. Please try again.",
                });
            }
        } catch {
            toast("An error occurred.", {
                description: "Something went wrong while creating the pin. Please try again.",
            });
        }
    };

    if (!isMounted) return null;


    return (
        <form onSubmit={handlePinSubmit} className="space-y-6">
            <PinFormField
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the pin title"
                required
            />
            <PinFormField
                label="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the pin description"
                required
            />
            <BoardSelect
                boards={boards}
                selectedBoard={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                loading={boardLoading}
            />
            <ImageUpload image={image} onChange={handleImageChange} />
            <div className="flex justify-between items-center">
                <button
                    type="submit"
                    disabled={pinLoading}
                    className="py-2 px-4 bg-[#E60023] text-white rounded-md hover:bg-[#E60023]/80"
                >
                    {pinLoading ? "Creating Pin..." : "Create Pin"}
                </button>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Create New Board
                </button>
            </div>

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
        </form>
    );
};

export default CreatePinForm;
