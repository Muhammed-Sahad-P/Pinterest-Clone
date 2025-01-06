import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/store/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { fetchUserProfile } from "@/lib/store/thunks/user-thunks";

export function NavDropdown() {
    const dispatch = useDispatch<AppDispatch>();
    const currentAccount = useSelector((state: RootState) => state.user.currentAccount);
    const router = useRouter();
    const userProfile = useSelector((state: RootState) => state.user.userProfile);

    useEffect(() => {
        if (!userProfile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, userProfile]);

    const userCookie = Cookies.get("user");
    let email = null;
    if (userCookie) {
        try {
            const user = JSON.parse(userCookie);
            email = user.email;
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    const firstLetter = email ? email.charAt(0).toUpperCase() : <FaUserCircle />;
    const profilePicture = userProfile?.profilePicture;

    const handleLogout = async () => {
        await signOut();
        await dispatch(logout());
        router.push("/");
        window.location.reload();
    };

    const itemClass =
        "block w-full px-2 py-1 rounded-lg text-gray-800 hover:bg-gray-100 hover:text-blue-500 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-150 ease-in-out cursor-pointer";

    const avatarClass =
        "flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:ring-2 hover:ring-blue-500 transition duration-150 ease-in-out";

    return (
        <DropdownMenu>
            <Link href="/u/profile">
                <div className={avatarClass}>
                    {profilePicture ? (
                        <Image
                            src={profilePicture}
                            alt="Profile Picture"
                            className="w-full h-full object-cover rounded-full"
                            width={40}
                            height={40}
                        />
                    ) : (
                        typeof firstLetter === "string" ? firstLetter : <FaUserCircle />
                    )}
                </div>
            </Link>
            <DropdownMenuTrigger asChild>
                <p className="text-gray-700 text-[20px] rounded-full hover:bg-[#E9E9E9] font-bold transition duration-200">
                    <MdKeyboardArrowDown />
                </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 mr-10">
                <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">
                    Currently in {currentAccount || "Default"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {profilePicture ? (
                                    <Image
                                        src={profilePicture}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover rounded-full"
                                        width={40}
                                        height={40}
                                    />
                                ) : (
                                    typeof firstLetter === "string" ? firstLetter : <FaUserCircle />
                                )}
                            </div>
                            <span className={`${itemClass} font-bold ml-1`}>{email || "Guest"}</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className={`${itemClass} text-xs font-medium`}>
                            Your accounts
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>Add account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>Convert to business</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <span className="block px-2 py-1 text-xs text-black">more options</span>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/u/settings">
                            <span className={`${itemClass} font-bold`}>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>Home feed tuner</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>
                            Install the Windows app
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>
                            Reports and violations center
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className={`${itemClass} font-bold`}>
                            Your privacy rights
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span
                            onClick={handleLogout}
                            className={`${itemClass} font-bold`}
                        >
                            Log out
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
