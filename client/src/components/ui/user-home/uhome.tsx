"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPins } from "@/lib/store/thunks/pin-thunk";
import { AppDispatch, RootState } from "@/lib/store";
import { Pin } from "@/lib/types";
import PinImag from "./PinImg";

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
                return <PinImag key={index} pin={pin} />;
            })}
        </div>
    );
};

export default UserHome;
