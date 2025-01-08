"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPins } from "@/lib/store/thunks/pin-thunk";
import { AppDispatch, RootState } from "@/lib/store";
import { Pin } from "@/lib/types";
import PinImag from "./PinImg";
import Skeleton from "@mui/material/Skeleton";

const UserHome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pins, loading, error } = useSelector((state: RootState) => state.pin);

    useEffect(() => {
        dispatch(fetchPins());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="masonry-layout p-3">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="skeleton-wrapper">
                        <Skeleton variant="rectangular" width="100%" height={250} />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
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
