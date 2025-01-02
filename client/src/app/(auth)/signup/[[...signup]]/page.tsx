"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearMessages, setIsSignupModalOpen, setShowModal } from "@/lib/store/features/userSlice";
import { googleLogin, signup } from "@/lib/store/thunks/user-thunks";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

interface FormValues {
    email: string;
    password: string;
    birthdate: string;
}

export default function Signup() {

    const { data: session } = useSession()

    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { error, successMessage } = useAppSelector((state) => state.user);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        birthdate: Yup.date()
            .required("Birthdate is required")
            .max(new Date(), "Birthdate cannot be in the future"),
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        dispatch(clearMessages());

        const resultAction = await dispatch(
            signup({
                email: values.email,
                password: values.password,
                birthdate: values.birthdate,
            })
        );

        if (signup.fulfilled.match(resultAction)) {
            dispatch(setShowModal(true))
        }
        setSubmitting(false);
    };

    useEffect(() => {
        dispatch(clearMessages());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            birthdate: "",
        },
        validationSchema: SignupSchema,
        onSubmit: handleSubmit,
    });


    useEffect(() => {
        if (session?.user) {
            const { email } = session.user;
            if (email) {
                dispatch(googleLogin({ email })).unwrap().then((response) => {
                    if (response.statusCode === 200) {
                        router.push('/u/home');
                    }
                    if (response.message) {
                        toast(response.message);
                    }
                })
                    .catch((error) => {
                        toast.error((error as { message: string }).message || "An unknown error occurred");
                    });
            }
        }
    }, [session, dispatch, router]);

    const handleGoogleLogin = async () => {
        await signIn("google");
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl w-[90%] max-w-lg shadow-lg relative flex flex-col items-center h-auto">
                <button
                    className="absolute top-6 right-8 text-black text-2xl font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => dispatch(setIsSignupModalOpen(false))}
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
                    <p className="mb-6 text-gray-600">Find new ideas to try</p>

                    {error && (
                        <div className="text-red-600 text-sm mb-2">{error}</div>
                    )}
                    {successMessage && (
                        <div className="text-green-600 text-sm mb-2">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-[15px] ml-2 text-gray-700 font-medium mb-1 float-start">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 px-3 py-2 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600 text-xs mt-1">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-2 relative">
                            <label className="block text-[15px] ml-2 text-gray-700 font-medium mb-1 float-start">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border border-gray-300 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                                placeholder="Create a password"
                                {...formik.getFieldProps("password")}
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-4 top-11 text-black"
                            >
                                {showPassword ? (
                                    <IoMdEyeOff size={18} />
                                ) : (
                                    <IoMdEye size={18} />
                                )}
                            </button>
                            {formik.touched.password &&
                                formik.errors.password ? (
                                <div className="text-red-600 text-xs mt-1">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-2">
                            <label className="block text-[15px] ml-2 text-gray-700 font-medium mb-1 float-start">
                                Birthdate
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 px-3 py-2 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                                placeholder="mm/dd/yyyy"
                                {...formik.getFieldProps("birthdate")}
                            />
                            {formik.touched.birthdate &&
                                formik.errors.birthdate ? (
                                <div className="text-red-600 text-xs mt-1">
                                    {formik.errors.birthdate}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#E60023] text-white py-2 rounded-full hover:bg-red-500 mb-3 text-sm"
                        >
                            Continue
                        </button>
                        <div>
                            <p className="text-center text-base text-black mb-1">
                                OR
                            </p>
                        </div>
                        <button
                            type="button"
                            className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 mb-2 text-sm"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle size={25} className="mr-2 float-end" />
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-center text-[12px] text-gray-500 mt-2">
                        By continuing, you agree to Pinterest&apos;s{" "}
                        <span className="block">
                            <a
                                href="#"
                                className="text-black text-[12px] underline"
                            >
                                Terms of Service
                            </a>{" "}
                            and acknowledge you&apos;ve read
                        </span>
                        <span className="block">
                            our{" "}
                            <a
                                href="#"
                                className="text-black text-[12px] underline"
                            >
                                Privacy Policy. Notice at collection
                            </a>
                        </span>
                    </p>
                    <div className="text-[12px] text-black mt-2">
                        Already a member?{" "}
                        <p
                            className="text-black font-semibold cursor-pointer  hover:underline"
                            onClick={() => dispatch(setShowModal(true))}
                        >
                            Log in
                        </p>
                    </div>
                </div>

                <div className="bg-[#E9E9E9] py-2 w-full rounded-b-3xl mt-2 flex-shrink-0">
                    <button
                        className="text-black font-medium text-base w-full py-2"
                    >
                        Create a free business account
                    </button>
                </div>
            </div>
        </div>
    );
}
