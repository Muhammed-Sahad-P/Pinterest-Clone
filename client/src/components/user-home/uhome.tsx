"use client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchPins } from "@/lib/store/thunks/pin-thunk";

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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {pins?.data?.map((pin: any, index: number) => (
                <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
                    <Image
                        className="object-cover rounded-lg"
                        src={pin.imageUrl}
                        alt={`Pin ${pin._id}`}
                        width={500}
                        height={300}
                    />
                </div>
            ))}
        </div>
    );
};

export default UserHome;


// import Image from "next/image";
// import React from "react";

// export default function UserHome() {
//     return (
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//             {Array.from({ length: 21 }, (_, index) => (
//                 <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
//                     <Image
//                         className="object-cover rounded-lg"
//                         src={`/${index + 1}.jpg`}
//                         alt={`Image ${index + 1}`}
//                         width={500}
//                         height={300}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// }