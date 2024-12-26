import React from "react";
import { Board } from "@/lib/types";

interface BoardSelectProps {
    boards: Board[];
    selectedBoard: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    loading: boolean;
}

const BoardSelect: React.FC<BoardSelectProps> = ({
    boards,
    selectedBoard,
    onChange,
    loading,
}) => {
    return (
        <div>
            <label className="text-sm text-black">Board</label>
            {loading ? (
                <p className="text-sm text-gray-500">Loading boards...</p>
            ) : (
                <select
                    value={selectedBoard}
                    onChange={onChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Choose a board</option>
                    {boards?.map((board) => (
                        <option key={board._id} value={board._id}>
                            {board.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default BoardSelect;
