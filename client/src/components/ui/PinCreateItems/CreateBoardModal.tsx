import React from "react";

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
    if (!isModalOpen) return null;

    return (
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
                        {boardLoading ? "Creating Board..." : "Create Board"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBoardModal;
