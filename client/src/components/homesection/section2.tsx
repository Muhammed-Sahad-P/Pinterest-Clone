"use client";
import Image from "next/image";
import Link from "next/link";

export default function Section2() {
    return (
        <div className="min-h-screen bg-[#DAFFF6] flex justify-center items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
                    <div className="relative w-full lg:w-1/2 mb-12 lg:mb-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="relative rounded-lg overflow-hidden w-full h-[300px] sm:h-[400px] sm:w-[500px] lg:h-[500px]">
                                <Image
                                    src="/BlueHome.png"
                                    alt="Food 1"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 text-center relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#006B6C] mb-6">
                            Save ideas you like
                        </h1>
                        <p className="text-[#006B6C] text-xl sm:text-2xl lg:text-2xl mb-6">
                            <span className="block">Collect your favorites so you can</span>
                            <span className="block">get back to them later</span>
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
