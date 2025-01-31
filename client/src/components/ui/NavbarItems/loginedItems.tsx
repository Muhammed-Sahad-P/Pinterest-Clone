import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { NavDropdown } from "./NavDropdown";
import { IoMdClose } from "react-icons/io";
import socket from "@/utils/socket";

interface Notification {
    message: string;
    createdAt: Date;
    read: boolean;
}

const LoginedItems: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        socket.on("newPin", (notification) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                { ...notification, read: false },
            ]);
        });

        return () => {
            socket.off("newPin");
        };
    }, []);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);

        if (!showNotifications) {
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) => ({
                    ...notif,
                    read: true,
                }))
            );
        }
    };

    const hasUnreadNotifications = notifications.some((notif) => !notif.read);

    return (
        <div className="flex items-center space-x-4 relative">
            <button
                className="relative text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full focus:outline-none"
                title="Notifications"
                onClick={handleNotificationClick}
            >
                <IoNotifications size={25} />
                {hasUnreadNotifications && (
                    <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
            </button>
            {showNotifications && (
                <div className="absolute right-0 mt-40 w-60 bg-white shadow-xl rounded-md p-4 z-10 max-h-[300px] overflow-y-auto">
                    <button
                        className="absolute top-1 right-2 p-1 text-black"
                        onClick={() => setShowNotifications(false)}
                    >
                        <IoMdClose />
                    </button>
                    <h3 className="text-lg font-bold">Notifications</h3>
                    <ul className="space-y-2 mt-3">
                        {notifications.length === 0 ? (
                            <li>No new notifications.</li>
                        ) : (
                            notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className={`${notification.read
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                        }`}
                                >
                                    <p className="text-sm">{notification.message}</p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

            <button
                className="text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full focus:outline-none"
                title="Messages"
            >
                <LuMessageCircleMore size={25} />
            </button>

            <div
                className="flex items-center space-x-1 cursor-pointer text-[#767676] dark:text-gray-200 hover:bg-[#E9E9E9] rounded-full"
                title="Accounts and Settings"
            >
                <NavDropdown />
            </div>
        </div>
    );
};

export default LoginedItems;
