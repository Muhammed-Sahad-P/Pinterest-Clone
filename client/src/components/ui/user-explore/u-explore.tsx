"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '../button';

export default function UserExplore() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const dateFormat = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setCurrentDate(dateFormat);
    }, []);

    const exploreData = [
        { src: "https://i.pinimg.com/736x/95/99/65/959965dc531d89949623ebec8b06070c.jpg", text: "Staying in on NYE?", title: "Movie night foods for a cozy celebration" },
        { src: "https://i.pinimg.com/736x/6c/71/4a/6c714a55fff5c8b3ccea1506b056c47e.jpg", text: "Nook Nook", title: "Create a cutesy in any space" },
        { src: "https://i.pinimg.com/736x/d6/a7/15/d6a715a064a6a2ac51c5aa6431e68142.jpg", text: "Stay calm and collected", title: "Relaxing bath ritual ideas" },
        { src: "https://i.pinimg.com/736x/97/71/53/97715333f977e9995eb1af6f18f2615d.jpg", text: "Holiday cheer", title: "Merry Christmas wishes to share" },
        { src: "https://i.pinimg.com/736x/c6/dd/86/c6dd868baabb39e57934a7e330dbd563.jpg", text: "New Year party special", title: "Sparkly makeup to look extra glam" },
        { src: "https://i.pinimg.com/736x/00/90/ea/0090eac5f1b4ac78fad3b82e12e6b3aa.jpg", text: "Fresh start inspo", title: "New beginning quotes to hype you up" },
    ];

    return (
        <div className="container mx-auto p-10 px-20">
            <div className="text-center mb-10">
                <p className="text-lg font-semibold text-black">{currentDate}</p>
                <h1 className="text-4xl font-semibold text-black">Stay Inspired</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {exploreData.map((item, index) => {
                    const titleWords = item.title.split(' ');
                    const mainTitle = titleWords.slice(0, -1).join(' ');
                    const lastWord = titleWords[titleWords.length - 1];
                    return (
                        <div
                            key={index}
                            className="relative bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden"
                        >
                            <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
                            <Image
                                src={item.src}
                                alt={`Explore ${index + 1}`}
                                className="w-full h-80 object-cover"
                                width={400}
                                height={400}
                            />
                            <div className="absolute inset-0 flex items-center justify-center mt-24 text-white font-normal text-sm z-10">
                                {item.text}
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center mt-48 text-white z-10 text-center">
                                <h2 className="font-semibold text-2xl">{mainTitle}</h2>
                                <h2 className="font-semibold text-2xl">{lastWord}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white overflow-hidden"></div>
                <div className="relative bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden">
                    <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
                    <Image
                        src="https://i.pinimg.com/736x/fe/25/28/fe2528d7d395afce8cd706763396a662.jpg"
                        alt="Explore single"
                        className="h-80 object-cover"
                        width={400}
                        height={400}
                    />
                    <div className="absolute inset-0 flex items-center justify-center mt-24 text-white font-normal text-sm z-10">
                        Celebrate in style
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-44 text-white z-10 text-center">
                        <h2 className="font-semibold text-2xl">Outfits idea for the year-end</h2>
                        <h2 className="font-semibold text-2xl">festivities</h2>
                    </div>
                </div>
                <div className="bg-white overflow-hidden"></div>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <Button className='bg-[#E9E9E9] text-black rounded-2xl hover:text-white' onClick={() => { window.location.href = "/u/home" }}>Go to home feed</Button>
            </div>
        </div>
    );
}
