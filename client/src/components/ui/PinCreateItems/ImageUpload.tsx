import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { RiUploadCloudFill } from "react-icons/ri";

interface ImageUploadProps {
    image: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onChange, onRemove }) => {
    return (
        <div className="flex justify-center items-center w-full">
            {!image && (
                <div className="relative w-[250px] h-[350px] sm:w-[300px] sm:h-[400px] bg-gray-200 border border-gray-300 rounded-2xl flex flex-col justify-center items-center text-gray-500">
                    <div className="text-4xl mb-2">
                        <RiUploadCloudFill className="text-black" />
                    </div>
                    <p className="font-sm text-black">Choose a file</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                    <p className="absolute bottom-3 text-center text-xs sm:text-sm text-black px-4">
                        We recommend using high-quality .jpg files less than 20 MB.
                    </p>
                </div>
            )}
            {image && (
                <div className="relative w-[250px] h-[350px] sm:w-[300px] sm:h-[400px]">
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
