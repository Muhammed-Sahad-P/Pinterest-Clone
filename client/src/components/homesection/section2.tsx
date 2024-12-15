"use client";
import Image from "next/image";

export default function Section2() {
    return (
        <div className="min-h-screen bg-[#FFFD92] flex justify-center items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
                    <div className="relative w-full lg:w-1/2 mb-12 lg:mb-0">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    src="/yellow-img-1.png"
                                    alt="Food 1"
                                    width={400}
                                    height={200}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    src="/yellow-img-2.png"
                                    alt="Food 2"
                                    width={250}
                                    height={250}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="relative rounded-lg overflow-hidden col-span-2 lg:col-span-1">
                                <Image
                                    src="/yellow-img-5.png"
                                    alt="Food 3"
                                    width={250}
                                    height={250}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="relative rounded-lg overflow-hidden col-span-2 lg:col-span-1">
                                <Image
                                    src="/yellow-img-4.png"
                                    alt="Food 4"
                                    width={250}
                                    height={250}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center relative">
                        <h1 className="text-4xl lg:text-6xl font-bold text-[#006B6C] mb-6">
                            Save ideas you like
                        </h1>
                        <p className="text-[#006B6C] text-2xl mb-6">
                            <span className="block">Collect your favorites so you can</span>
                            <span className="block">get back to them later</span>
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
