"use client";
import Image from "next/image";
import Link from "next/link";

export default function Section3() {
    return (
        <div className="min-h-screen bg-[#FFE2EB] flex justify-center items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="relative w-full lg:w-1/2 h-[400px] lg:h-screen mb-6 lg:mb-0">
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src="/blue-img-1.png"
                                alt="Full-width Image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#C32F00] mb-6">
                            See it, make it,
                            <span className="block">try it, do it</span>
                        </h1>
                        <p className="text-[#C32F00] text-xl sm:text-2xl lg:text-2xl mb-6">
                            <span className="block">The best part of Pinterest is discovering</span>
                            <span className="block">new things and ideas from people</span>
                            <span className="block">around the world.</span>
                        </p>
                        <Link href="/p/explore">
                            <button className="bg-[#E60023] text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300">
                                Explore
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
