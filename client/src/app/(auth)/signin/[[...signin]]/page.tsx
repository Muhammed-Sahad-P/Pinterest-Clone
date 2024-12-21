"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, setForgetEmail } from "@/lib/store/features/userSlice";
import { loginUser } from "@/lib/store/thunks/user-thunks";
import { AppDispatch, RootState } from "@/lib/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { error } = useSelector((state: RootState) => state.user);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleForgotPassword = (email: string) => {
        dispatch(setForgetEmail(email));
        router.push("/forgot-password");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl w-[90%] max-w-lg shadow-lg relative flex flex-col items-center h-auto">
                <button
                    className="absolute top-6 right-8 text-black text-2xl font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => window.location.reload()}
                >
                    ✕
                </button>

                <div className="text-center flex-grow mt-5">
                    <Image
                        src="/pinterest.png"
                        alt="Pinterest Logo"
                        className="h-8 w-8 text-center mt-2 mx-auto mb-4"
                        width={32}
                        height={32}
                    />
                    <p className="text-3xl font-semibold mb-4 font-oxygen text-[#333333]">
                        Welcome to Pinterest
                    </p>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            setSuccessMessage("");
                            dispatch(clearMessages());

                            const result = await dispatch(loginUser(values));
                            setSubmitting(false);

                            if (result?.payload?.data?.newUser) {
                                setSuccessMessage("Welcome! Redirecting...");
                                setTimeout(() => (window.location.href = "/"), 1500);
                            } else if (result?.payload?.statusCode === 200) {
                                setSuccessMessage("Login successful! Redirecting...");
                                setTimeout(() => (window.location.href = "/u/home"), 1500);
                            } else if (result?.payload?.message) {
                                setFieldError("email", result.payload.message);
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched, values }) => (
                            <Form>
                                <div className="mb-2 mt-8">
                                    <label className="block text-[15px] ml-2 text-gray-700 font-medium mb-1 float-start">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className={`w-full border px-3 py-2 rounded-2xl ${errors.email && touched.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } focus:ring-2 focus:ring-red-600 focus:outline-none`}
                                        placeholder="Email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-red-500 text-xs mt-1 text-left"
                                    />
                                </div>

                                <div className="mb-2 relative">
                                    <label className="block text-[15px] ml-2 text-gray-700 font-medium mb-1 float-start">
                                        Password
                                    </label>
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`w-full border px-4 py-3 rounded-2xl ${errors.password && touched.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } focus:ring-2 focus:ring-red-600 focus:outline-none`}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-4 top-11 text-black"
                                    >
                                        {showPassword ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                                    </button>
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-xs mt-1 text-left"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs mt-1 text-left">{error}</p>
                                )}
                                {successMessage && (
                                    <p className="text-green-500 text-xs mt-1 text-left">
                                        {successMessage}
                                    </p>
                                )}

                                <div
                                    onClick={() => handleForgotPassword(values.email)}
                                    className="text-[15px] text-black mt-1 float-start font-semibold cursor-pointer hover:underline"
                                >
                                    Forgot Your Password?
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#E60023] text-white py-2 rounded-full hover:bg-red-500 mt-4 mb-3 text-[15px]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Logging in..." : "Log in"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div>
                        <p className="text-center text-base text-black mb-1">OR</p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 mb-2 text-sm"
                        onClick={() => alert("Google Sign-In coming soon!")}
                    >
                        <FcGoogle size={25} className="mr-2 float-end" />
                        Continue with Google
                    </button>
                </div>

                <div className="bg-white py-2 w-full rounded-b-3xl mt-2 flex-shrink-0">
                    <div className="text-black font-semibold text-[12px] text-center">
                        Not on Pinterest yet?
                        <Link href="/signup" className="text-black font-semibold ml-2">
                            Sign up
                        </Link>
                    </div>
                    <div
                        className="text-black text-[12px] text-center mb-2 mt-2"
                        onClick={() => alert("Switch to Business Account!")}
                    >
                        Are you a business?<a href="#" className="text-black"> Get started here!</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
