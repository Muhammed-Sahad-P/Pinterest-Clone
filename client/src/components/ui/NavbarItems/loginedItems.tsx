import React from "react";
import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const LoginedItems: React.FC = () => (
    <div className="flex items-center space-x-6">
        <button
            className="text-gray-700 dark:text-gray-200 hover:text-red-500 focus:outline-none"
            title="Notifications"
        >
            <FaBell size={20} />
        </button>

        <button
            className="text-gray-700 dark:text-gray-200 hover:text-red-500 focus:outline-none"
            title="Messages"
        >
            <FaEnvelope size={20} />
        </button>

        <div className="flex items-center space-x-1 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-red-500">
            <FaUserCircle size={20} />
            <MdKeyboardArrowDown size={20} />
        </div>
    </div>
);

export default LoginedItems;
