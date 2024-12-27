import React from "react";
import { Board } from "@/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BoardSelectProps {
    boards: Board[];
    selectedBoard: string;
    onChange: (value: string) => void;
    loading: boolean;
}

const BoardSelect: React.FC<BoardSelectProps> = ({
    boards,
    selectedBoard,
    onChange,
    loading,
}) => {
    return (
        <div className="flex justify-center items-center">
            <label className="text-sm text-black mr-2">Board</label>
            {loading ? (
                <p className="text-sm text-gray-500">Loading boards...</p>
            ) : (
                <Select
                    onValueChange={(value) => onChange(value)}
                    value={selectedBoard}

                >
                    <SelectTrigger className="w-auto border-gray-300">
                        <SelectValue placeholder="Choose a board" />
                    </SelectTrigger>
                    <SelectContent>
                        {boards?.map((board) => (
                            <SelectItem key={board._id} value={board._id}>
                                {board.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};

export default BoardSelect;
