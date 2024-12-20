import React from "react";
import Image from "next/image";

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <Image
            src="/pinterest-color-svgrepo-com.svg"
            alt="Pinterest Logo"
            className="h-6 w-6"
            width={20}
            height={20}
        />
    </div>
);

export default Logo;
