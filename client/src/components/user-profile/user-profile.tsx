"use client";
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUserProfile } from "@/lib/store/thunks/user-thunks";
import { useAppSelector } from '@/lib/store/hooks';
import UserPinProfile from '../ui/userProfile/UserPinProfile';
import UserBoardProfile from '../ui/userProfile/UserBoardProfile';

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();

    const user = useAppSelector((state: RootState) => state.user.userProfile);
    const { email, following } = user || {};

    const [activeTab, setActiveTab] = useState<'activity' | 'pins' | 'boards'>('pins');

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, user]);

    if (!email) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const emailName = email.split('@')[0];
    const firstLetter = email.charAt(0).toUpperCase();

    return (
        <div className="p-4 md:p-8 lg:px-16">
            <div className="flex flex-wrap justify-between items-center mt-2">
                <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 lg:mb-0">
                    Your Saved Ideas
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E9E9E9] flex justify-center items-center">
                        <span className="text-black text-lg sm:text-xl">
                            {firstLetter || <FaUserCircle />}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-center sm:text-left">
                        <div>
                            <p className="font-semibold text-lg sm:text-xl">{emailName}</p>
                            <p className="text-black text-sm sm:text-base">{following?.length || 0} following</p>
                        </div>
                        <button
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#E9E9E9] text-black font-semibold rounded-3xl mt-2 sm:mt-0"
                            onClick={() => console.log('View Profile button clicked')}
                        >
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
            <div className="tabs mt-10 flex justify-start gap-4 sm:gap-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                <button
                    onClick={() => setActiveTab('pins')}
                    className={`pb-2 ${activeTab === 'pins' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}
                >
                    Pins
                </button>
                <button
                    onClick={() => setActiveTab('boards')}
                    className={`pb-2 ${activeTab === 'boards' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}
                >
                    Boards
                </button>
            </div>
            <div className="tab-content mt-6">
                {activeTab === "pins" ? <UserPinProfile /> : activeTab === "boards" ? <UserBoardProfile /> : <div>Activity content goes here</div>}
            </div>
        </div>
    );
}
