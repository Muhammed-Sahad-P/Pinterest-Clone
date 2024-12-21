"use client";

import React from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { NavDropdown } from "./NavDropdown";

const LoginedItems: React.FC = () => (
    <div className="flex items-center space-x-4">
        <button
            className="text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full focus:outline-none"
            title="Notifications"
        >
            <IoNotifications size={25} />
        </button>

        <button
            className="text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full focus:outline-none"
            title="Messages"
        >
            <LuMessageCircleMore size={25} />
        </button>
        <div className="flex items-center space-x-1 cursor-pointer text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full"
            title="Accounts and Settings">
            <NavDropdown />
        </div>
    </div>
);

export default LoginedItems;
