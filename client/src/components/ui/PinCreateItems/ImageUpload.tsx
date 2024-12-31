import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

interface ImageUploadProps {
    image: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onChange, onRemove }) => {
    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            {!image && (
                <div className="relative w-[300px] h-[400px] bg-gray-200 border border-gray-300 rounded-2xl flex justify-center items-center text-gray-500">
                    <span>No file chosen</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                </div>
            )}
            {image && (
                <div className="relative w-[300px] h-[400px]">
                    <Image
                        src={URL.createObjectURL(image)}
                        alt="Selected Preview"
                        className="object-cover rounded-2xl w-full h-full"
                        width={300}
                        height={300}
                    />
                    <button
                        onClick={onRemove}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full text-center text-sm sm:text-lg shadow-md hover:shadow-lg"
                    >
                        <MdDelete size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
