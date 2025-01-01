import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
            <DialogContent className="max-w-lg w-full px-4 py-6 sm:px-6 md:px-8 bg-white rounded-lg shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-black md:text-xl">
                        Create New Board
                    </DialogTitle>
                    <DialogDescription className="text-sm text-black md:text-base">
                        Fill in the details below to create a new board.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Board Name
                        </label>
                        <input
                            type="text"
                            value={newBoardName}
                            onChange={(e) => setNewBoardName(e.target.value)}
                            placeholder="Enter board name"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#E60023] focus:border-[#E60023] text-gray-700 placeholder-gray-400 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Board Description
                        </label>
                        <input
                            type="text"
                            value={newBoardDescription}
                            onChange={(e) => setNewBoardDescription(e.target.value)}
                            placeholder="Enter board description"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#E60023] focus:border-[#E60023] text-gray-700 placeholder-gray-400 sm:text-sm"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="py-2 px-4 text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateBoard}
                        className="py-2 px-4 bg-[#E60023] text-white rounded-md hover:bg-[#E60023]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E60023]"
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
