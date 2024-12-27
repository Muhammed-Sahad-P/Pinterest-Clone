import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface CreateBoardModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    newBoardName: string;
    setNewBoardName: (name: string) => void;
    newBoardDescription: string;
    setNewBoardDescription: (description: string) => void;
    handleCreateBoard: () => void;
    boardLoading: boolean;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    newBoardName,
    setNewBoardName,
    newBoardDescription,
    setNewBoardDescription,
    handleCreateBoard,
    boardLoading,
}) => {

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Board</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new board.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Board Name
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700">
                            Board Description
                        </label>
                        <input
                            type="text"
                            value={newBoardDescription}
                            onChange={(e) => setNewBoardDescription(e.target.value)}
                            placeholder="Enter board description"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handleCreateBoard}
                        className="py-2 px-4 bg-[#E60023] text-white rounded-md hover:bg-[#E60023]/80"
                        disabled={boardLoading}
                    >
                        {boardLoading ? "Creating Board..." : "Create Board"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBoardModal;