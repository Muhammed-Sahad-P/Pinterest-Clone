"use client";
import Image from "next/image";

export default function Section3() {
    return (
        <div className="min-h-screen bg-[#DAFFF6] flex justify-center items-center">
            <div className="container mx-auto">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className="relative w-full lg:w-1/2 h-screen  mb-0">
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src="/blue-img-1.png"
                                alt="Full-width Image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-[#C32F00] mb-6">
                            See it, make it,
                            <span className="block">try it, do it</span>
                        </h1>
                        <p className="text-[#C32F00] text-2xl mb-6">
                            <span className="block">The best part of Pinterest is discovering</span>
                            <span className="block">new things and ideas from people</span>
                            <span className="block">around the world.</span>
                        </p>
                        <button className="bg-[#E60023] text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
