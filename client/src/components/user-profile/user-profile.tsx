"use client";
import React from 'react';
import Cookies from "js-cookie";
import { FaUserCircle } from 'react-icons/fa';

interface ProfilePageProps {
    email?: string;
    followingCount?: number;
}

export default function ProfilePage({ followingCount }: ProfilePageProps) {
    const userCookie = Cookies.get("user");
    let cookieEmail: string | null = null;

    if (userCookie) {
        try {
            const user = JSON.parse(userCookie);
            cookieEmail = user.email;
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    const emailName = cookieEmail ? cookieEmail.split('@')[0] : '';
    const firstLetter = cookieEmail ? cookieEmail.charAt(0).toUpperCase() : <FaUserCircle />;

    return (
        <div>
            <div className='flex justify-between items-center mt-2'>
                <h2 className='font-semibold text-4xl ml-32'>Your Saved Ideas</h2>
                <div className='flex items-center gap-4 mr-32'>
                    <div className='w-16 h-16 rounded-full bg-[#E9E9E9] flex justify-center items-center'>
                        <span className='text-black text-xl'>{firstLetter}</span>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <div className='text-left'>
                            <p className='font-semibold text-xl'>{emailName}</p>
                            <p className='text-black'>{followingCount} following</p>
                        </div>
                        <div className='ml-4'>
                            <button
                                className='px-4 py-2 bg-[#E9E9E9] text-black font-semibold rounded-3xl'
                                onClick={() => console.log('View Profile button clicked')}
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
