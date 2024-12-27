import React from "react";
import Image from "next/image";

interface ImageUploadProps {
    image: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onChange }) => {
    return (
        <div className="flex justify-center items-center">
            {image && (
                <Image
                    src={URL.createObjectURL(image)}
                    alt="Selected Preview"
                    className="w-64 h-64 object-contain"
                    width={400}
                    height={400}
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className="mt-1 block w-auto ml-4"
                required
            />
        </div>
    );
};

export default ImageUpload;
