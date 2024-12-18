"use client";
import Image from "next/image";

export default function Section1() {
    return (
        <div className="min-h-screen bg-[#FFDFE9] flex justify-center items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className="relative w-full lg:w-1/2 mb-12 lg:mb-6">
                        <div className="relative">
                            <div className="relative w-[300px] h-[350px] mx-auto rounded-lg overflow-hidden z-10">
                                <Image
                                    src="/rose-img-main.png"
                                    alt="Main Image"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                                <div className="absolute bottom-20 -ml-4 left-1/2 transform mb-16 -translate-x-1/2 z-50 w-[90%]">
                                    <div className="bg-white flex items-center rounded-full shadow-lg p-5">
                                        <svg
                                            className="w-7 h-7 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                                            />
                                        </svg>
                                        <p className="text-[#6E0F3C] text-2xl font-bold ml-5">easy chicken dinner</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-[-100px] left-[50%] ml-28 mt-8 transform -translate-x-1/2 w-[180px] h-[180px] rounded-lg overflow-hidden z-0">
                                <Image
                                    src="/rose-img-1.png"
                                    alt="Rose Image 1"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="absolute bottom-[-100px] left-[50%] ml-28 transform -translate-x-1/2 w-[180px] h-[180px] rounded-lg overflow-hidden z-0">
                                <Image
                                    src="/rose-image-3.png"
                                    alt="Rose Image 2"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="absolute top-[50%] left-[-50px] ml-24 transform -translate-y-1/2 w-[200px] h-[200px] rounded-lg overflow-hidden z-0">
                                <Image
                                    src="/rose-img-2.png"
                                    alt="Rose Image 3"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-[#C31952] mb-6">
                            Search for an idea
                        </h1>
                        <p className="text-[#C31952] text-2xl mb-6">
                            <span className="block">What do you want to try next?</span>
                            <span className="block">of something you’re into—like</span>
                            <span className="block font-semibold text-[#C31952]">&quot;easy chicken dinner&quot;</span>
                            <span className="block">and see what you find.</span>
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
