import Image from "next/image";
import React from "react";

export default function UserHome() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Array.from({ length: 21 }, (_, index) => (
                <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
                    <Image
                        className="object-cover rounded-lg"
                        src={`/${index + 1}.jpg`}
                        alt={`Image ${index + 1}`}
                        width={500}
                        height={300}
                    />
                </div>
            ))}
        </div>
    );
}
