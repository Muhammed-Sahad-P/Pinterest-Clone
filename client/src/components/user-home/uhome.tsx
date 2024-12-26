"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchPins } from "@/lib/store/thunks/pin-thunk";
import { AppDispatch, RootState } from "@/lib/store";

interface Pin {
    _id: string;
    imageUrl: string;
}

const UserHome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pins, loading, error } = useSelector((state: RootState) => state.pin);

    useEffect(() => {
        dispatch(fetchPins());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="masonry-layout p-3">
            {pins?.map((pin: Pin, index) => {
                if (!pin.imageUrl) {
                    return null;
                }
                return (
                    <div key={index} className="masonry-item">
                        <Image
                            className="object-cover rounded-2xl w-full"
                            src={pin.imageUrl}
                            alt={`Pin ${pin._id}`}
                            width={500}
                            height={300}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default UserHome;
