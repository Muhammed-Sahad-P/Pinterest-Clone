"use client";
import Image from "next/image";
import Link from "next/link";

export default function Section1() {
    return (
        <div className="min-h-screen bg-[#FFFD92] flex justify-center items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="relative w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center">
                        <div className="relative w-[80%] sm:w-[60%] lg:w-[80%] max-w-[500px] h-[350px] sm:h-[600px] rounded-lg overflow-hidden z-10">
                            <Image
                                src="/YellowHome.png"
                                alt="Main Image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
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
                        <Link href="/p/explore">
                            <button className="bg-[#E60023] text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300">
                                Explore
                            </button>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
}
