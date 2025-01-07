"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

export default function UserWatch() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const date = new Date();
        const dateFormat = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setCurrentDate(dateFormat);
    }, []);

    const exploreData = [
        {
            src: "https://i.pinimg.com/736x/84/ab/ee/84abeef2964ba585c6b532f57919b37c.jpg",
            text: "Manifest it",
            title: "Create your 2025 vision board",
        },
        {
            src: "https://i.pinimg.com/736x/17/8d/68/178d6803af770a91f962bc32711cc181.jpg",
            text: "Vacay Mood",
            title: "Which travel destination are you feeling?",
        },
        {
            src: "https://i.pinimg.com/736x/cc/dd/6b/ccdd6bb323f5865c355b5b90bda25644.jpg",
            text: "Bold & Beautiful",
            title: "Red and gold manicure ideas",
        },
        {
            src: "https://i.pinimg.com/736x/62/3c/d3/623cd32d670959a510e7a7c8e2531003.jpg",
            text: "New Year reset",
            title: "Ideas for a fresh start",
        },
        {
            src: "https://i.pinimg.com/736x/7e/64/6a/7e646a5fb0cfac47fa4eb5fd3d56e916.jpg",
            text: "Self Love",
            title: "Kind notes to write to yourself",
        },
        {
            src: "https://i.pinimg.com/736x/7b/ce/ba/7bceba3ed6349b06adde4cac7e543984.jpg",
            text: "Bookworms special",
            title: "Reading Aesthetics",
        },
    ];

    return (
        <div className="container mx-auto p-10 px-20">
            <div className="text-center mb-10">
                <p className="text-lg font-semibold text-black">{currentDate}</p>
                <h1 className="text-4xl font-semibold text-black">Stay Inspired</h1>
            </div>
            <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                    {exploreData.map((item, index) => {
                        const titleWords = item.title.split(" ");
                        const mainTitle = titleWords.slice(0, -1).join(" ");
                        const lastWord = titleWords[titleWords.length - 1];

                        return (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:basis-1/2 lg:basis-1/3"
                            >
                                <Card className="relative overflow-hidden rounded-3xl shadow-md">
                                    <Image
                                        src={item.src}
                                        alt={`Explore ${index + 1}`}
                                        className="w-full h-80 object-cover"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center mt-24 text-white font-normal text-sm z-10">
                                        {item.text}
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-48 text-white z-10 text-center">
                                        <h2 className="font-semibold text-2xl">{mainTitle}</h2>
                                        <h2 className="font-semibold text-2xl">{lastWord}</h2>
                                    </div>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex justify-center items-center mt-10">
                <Button
                    className="bg-[#E9E9E9] text-black rounded-2xl hover:text-white"
                    onClick={() => {
                        window.location.href = "/u/home";
                    }}
                >
                    Go to home feed
                </Button>
            </div>
        </div>
    );
}
