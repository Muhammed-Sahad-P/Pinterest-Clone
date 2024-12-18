import React from "react";
import Image from "next/image";

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <Image
            src="/pinterest.png"
            alt="Pinterest Logo"
            className="h-8 w-8"
            width={20}
            height={20}
        />
        <span className="text-md font-bold text-[#E60023] font-oxygen">
            Pinterest
        </span>
    </div>
);

export default Logo;
