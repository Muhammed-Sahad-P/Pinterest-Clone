"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => (
    <Link href="/">
        <div className="flex items-center space-x-2">
            <Image
                src="/pinterest-color-svgrepo-com.svg"
                alt="Pinterest Logo"
                className="h-6 w-6"
                width={20}
                height={20}
            />
        </div>
    </Link>
);

export default Logo;
