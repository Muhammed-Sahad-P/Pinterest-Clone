"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { resetPassword, clearMessages } from "@/lib/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, successMessage } = useSelector(
        (state: RootState) => state.user
    );

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

    const router = useRouter();

    const { token }: { token: string } = useParams();

    const validateField = (field: string, value: string) => {
        let errorMessage = "";

        if (field === "newPassword") {
            if (value.trim() === "") {
                errorMessage = "New password is required.";
            } else if (value.length < 6) {
                errorMessage = "Password must be at least 6 characters long.";
            }
        }

        if (field === "confirmPassword") {
            if (value.trim() === "") {
                errorMessage = "Please confirm your password.";
            } else if (value !== newPassword) {
                errorMessage = "Passwords do not match.";
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    };

    const handleBlur = (field: string) => {
        validateField(field, field === "newPassword" ? newPassword : confirmPassword);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearMessages());

        validateField("newPassword", newPassword);
        validateField("confirmPassword", confirmPassword);

        if (!newPassword || !confirmPassword || errors.newPassword || errors.confirmPassword) return;

        dispatch(resetPassword({ token, newPassword }));
    };

    useEffect(() => {
        dispatch(clearMessages());
        if (successMessage) {
            router.push("/signin");
        }
    }, [dispatch, successMessage, router]);

    return (
        <div className="flex flex-col items-center mt-8 min-h-screen px-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center">
                Pick a new password
            </h1>
            {error && (
                <div className="text-red-500 text-sm text-center mb-4">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="text-green-500 text-sm text-center mb-4">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleResetPassword} className="w-full max-w-md mt-8">
                <div className="relative mb-6">
                    <label className="text-black block text-[15px] ml-2 font-medium mb-1">New password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-10 py-2 sm:py-3 border ${errors.newPassword
                                ? "border-red-500"
                                : "border-gray-300"
                                } bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() => handleBlur("newPassword")}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 top-2/4 transform -translate-y-2/4 flex items-center cursor-pointer text-gray-500"
                        >
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.newPassword}
                        </p>
                    )}
                </div>

                <div className="relative mb-6">
                    <label className="text-black block text-[15px] ml-2 font-medium mb-1">Type it again</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-10 py-2 sm:py-3 border ${errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                                } bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => handleBlur("confirmPassword")}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 top-2/4 transform -translate-y-2/4 flex items-center cursor-pointer text-gray-500"
                        >
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!!(loading || !newPassword || !confirmPassword)}
                    className={`w-full/2 py-2 float-right px-4 rounded-full ${!newPassword || !confirmPassword
                        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                        : "bg-[#E60023] text-white hover:bg-red-600 transition-all"
                        } ${loading && "opacity-50 cursor-not-allowed"}`}
                >
                    {loading ? "Updating Password..." : "Change Password"}
                </button>

            </form>
        </div>
    );
}
