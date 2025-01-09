import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPinsByUserId, deletePinById } from "@/lib/store/thunks/pin-thunk";
import { useAppSelector } from "@/lib/store/hooks";
import Cookies from "js-cookie";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";

export default function UserPinCreated() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, pins, error } = useAppSelector((state: RootState) => state.pin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pinToDelete, setPinToDelete] = useState<string | null>(null);

    useEffect(() => {
        const user = Cookies.get("user");
        const parsedUser = user ? JSON.parse(user) : null;

        if (parsedUser && parsedUser.id) {
            console.log("User ID:", parsedUser.id);
            dispatch(fetchPinsByUserId(parsedUser.id));
        } else {
            console.error("Invalid or missing user ID in cookies");
        }
    }, [dispatch]);

    const handleDelete = async () => {
        if (!pinToDelete) {
            console.error("No pin ID to delete");
            return;
        }

        try {
            await dispatch(deletePinById(pinToDelete));
            toast.success("Pin deleted successfully!");
        } catch (error) {
            console.error("Failed to delete pin.", error);
        } finally {
            setIsModalOpen(false);
            setPinToDelete(null);
        }
    };

    const openModal = (pinId: string) => {
        setPinToDelete(pinId);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setPinToDelete(null);
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">My Pins</h1>

            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(8)
                        .fill(null)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width="100%"
                                height={275}
                                className="rounded-2xl"
                            />
                        ))}
                </div>
            )}

            {error && (
                <p className="text-red-500">
                    Error: {typeof error === "object" ? JSON.stringify(error) : error}
                </p>
            )}

            {!loading && pins && pins.length === 0 && (
                <p className="text-center text-gray-500">No pins found.</p>
            )}

            <div className="masonry-layout p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6 space-x-4">
                {pins?.map((pin) => (
                    <div
                        key={pin._id}
                        className="relative group overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
                            {pin?.imageUrl && (
                                <a href={`/pin/${pin._id}`}>
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={pin.imageUrl}
                                        alt="Pin"
                                        width={300}
                                        height={300}
                                    />
                                </a>
                            )}
                            <div className="absolute top-4 right-3 hidden group-hover:block">
                                <button
                                    className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-2 rounded-full text-sm"
                                    onClick={() => openModal(pin?._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this pin?</h2>
                        <p className="mb-4">This action cannot be undone.</p>
                        <div className="flex justify-between">
                            <button onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete} className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-2 rounded-full">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
