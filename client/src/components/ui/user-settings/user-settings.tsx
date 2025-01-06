"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUserProfile, updateUserProfile } from "@/lib/store/thunks/user-thunks";
import { toast } from "sonner";
import Image from "next/image";

export default function UserSettings() {
    const dispatch = useDispatch<AppDispatch>();
    const { userProfile } = useSelector((state: RootState) => state.user);

    const [username, setUsername] = useState<string>(userProfile?.username ?? "");
    const [email, setEmail] = useState<string>(userProfile?.email ?? "");
    const [profilePicture, setProfilePicture] = useState<File | string>(userProfile?.profilePicture ?? "");
    const [preview, setPreview] = useState<string>(userProfile?.profilePicture ?? "");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfile());
        setIsMounted(true);
    }, [dispatch]);

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username ?? "");
            setEmail(userProfile.email);
            setProfilePicture(userProfile.profilePicture ?? "");
            setPreview(userProfile.profilePicture ?? "");
        }
    }, [userProfile]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);

        if (profilePicture instanceof File) {
            formData.append("profilePicture", profilePicture);
        }

        try {
            await dispatch(updateUserProfile({ username, email, profilePicture: profilePicture instanceof File ? profilePicture : "" }));
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error(`Error updating profile: ${err}`);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePicture(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 bg-white p-4 mt-8 lg:mt-0 ml-3 lg:ml-0">
                <ul className="space-y-4 text-black font-semibold">
                    <li className="font-medium">Edit profile</li>
                    <li>Account management</li>
                    <li>Profile visibility</li>
                    <li>Tune your home feed</li>
                    <li>Claimed accounts</li>
                    <li>Social permissions</li>
                    <li>Notifications</li>
                    <li>Privacy and data</li>
                    <li>Security</li>
                    <li>Branded Content</li>
                </ul>
            </div>
            <div className="w-full lg:w-3/4 max-w-4xl mx-auto mr-48 mt-5 p-6 bg-white">
                <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>
                <p className="text-black mb-6">
                    Keep your personal details private. Information you add here is
                    <br />
                    visible to anyone who can view your profile.
                </p>

                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                    <div>
                        <label className="block text-black text-[13px]">Photo</label>
                        <div className="flex items-center mt-2">
                            <div className="w-20 h-20 rounded-full bg-[#F1F1F1] flex justify-center items-center">
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="Profile Picture"
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full bg-[#F1F1F1] flex justify-center items-center"
                                    />
                                ) : (
                                    "A"
                                )}
                            </div>

                            <label htmlFor="file-input" className="ml-4 px-4 py-2 text-sm font-medium text-black bg-[#F1F1F1] rounded-2xl hover:bg-[#F1F1F1]/80 cursor-pointer">
                                Change
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-black text-[13px]">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full lg:w-1/3 p-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-black text-[13px]">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full lg:w-2/3 p-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Add your email"
                        />
                    </div>

                    <div>
                        <label className="block text-black text-[13px]">About</label>
                        <textarea
                            className="mt-1 block w-full lg:w-2/3 p-7 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Tell your story"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-[#E60023] text-white rounded-full hover:bg-[#E60023]/80"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
