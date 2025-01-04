"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPinById } from "@/lib/store/thunks/pin-thunk";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ActionButton from "../user-home/ActionButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSavePin } from "@/hooks/useSavePin";
import { useAppSelector } from "@/lib/store/hooks";
import { likeUnlikePin } from "@/lib/store/thunks/like-thunk";
import { createComment, fetchComments, deleteComment } from "@/lib/store/thunks/comment-thunk";
import { FaUserCircle } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Cookies from "js-cookie";

export default function DynamicPin() {
    const router = useRouter();
    const handleSave = useSavePin();
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { pinId } = useParams<{ pinId: string }>();
    const [likeCount, setLikeCount] = useState<number>(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const { selectedPin, loading, error } = useAppSelector((state: RootState) => state.pin);
    const { comments, isLoading } = useAppSelector((state: RootState) => state.comment);

    useEffect(() => {
        if (pinId) {
            dispatch(fetchPinById(pinId));
            dispatch(fetchComments(pinId));
        }
    }, [dispatch, pinId]);

    useEffect(() => {
        if (selectedPin?.likeCount !== undefined) {
            setLikeCount(selectedPin.likeCount);
        }
    }, [selectedPin]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handlePostComment = async () => {
        if (comment.trim() && pinId) {
            try {
                await dispatch(createComment({ pinId, text: comment, commentId: "" })).unwrap();
                setComment("");
                dispatch(fetchComments(pinId));
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (pinId) {
            try {
                await dispatch(deleteComment({ pinId, commentId, text: "" })).unwrap();
                dispatch(fetchComments(pinId));
            } catch (error) {
                console.error("Failed to delete comment:", error);
            }
        }
    };

    const handleLike = async () => {
        try {
            const result = await dispatch(likeUnlikePin({ pinId })).unwrap();
            setLikeCount(result.likeCount);
        } catch (error) {
            console.error("Failed to like/unlike the pin:", error);
        }
    };

    const handleEmojiClick = (emojiObject: { emoji: string }) => {
        setComment((prevComment) => prevComment + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!selectedPin) {
        return <div>No pin found with ID</div>;
    }

    const UserEmail = selectedPin.createdBy?.email?.split('@')[0];
    const firstLetter = UserEmail ? UserEmail.charAt(0).toUpperCase() : '';

    const userId = Cookies.get("user");
    const user = JSON.parse(userId || "");

    return (
        <div className="flex items-center justify-center bg-white p-6">
            <div className="absolute top-0 left-4 flex mr-5">
                <IoArrowBackCircleOutline
                    className="text-3xl text-black cursor-pointer"
                    onClick={() => router.back()}
                />
            </div>
            <div className="bg-white border w-full md:w-[700px] rounded-2xl shadow-lg flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    {selectedPin.imageUrl && (
                        <Image
                            src={selectedPin.imageUrl}
                            alt="Pin Image"
                            width={500}
                            height={500}
                            className="rounded-2xl shadow-md w-full"
                        />
                    )}
                </div>
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-4">
                                <FavoriteBorderIcon
                                    className="text-black mt-1 cursor-pointer"
                                    fontSize="medium"
                                    titleAccess="Like"
                                    onClick={handleLike}
                                />
                                <span className="text-black mt-1">{likeCount}</span>
                                <ActionButton
                                    className="text-[25px]"
                                    icon={MdOutlineFileUpload}
                                    title="Share"
                                />
                                <ActionButton
                                    className="text-[25px]"
                                    icon={SlOptions}
                                    title="Download Image"
                                />
                            </div>
                            <ActionButton
                                className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-5 py-2 rounded-full text-sm sm:text-base"
                                title="Save Pin"
                                onClick={() => handleSave(pinId)}
                            >
                                Save
                            </ActionButton>
                        </div>
                        <h2 className="font-semibold text-lg mt-2">{selectedPin.description}</h2>

                        <div className="flex items-center space-x-2 mt-4">
                            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#E9E9E9] flex justify-center items-center">
                                <span className="text-black text-lg sm:text-lg">
                                    {firstLetter || <FaUserCircle />}
                                </span>
                            </div>
                            <p className="text-black">{selectedPin.createdBy?.email}</p>
                        </div>
                        <div className="flex items-center mt-6 mb-2 justify-between">
                            <h2 className="font-semibold text-md ml-1"><span>{comments.length}  </span>Comment</h2>
                            <div
                                className="cursor-pointer ml-4"
                                onClick={() => setShowComments(!showComments)}
                            >
                                {showComments ? (
                                    <IoIosArrowUp className="text-xl" />
                                ) : (
                                    <IoIosArrowDown className="text-xl" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        {showComments && (
                            <div className="h-[300px] overflow-y-auto hide-scrollbar py-2 space-y-3">
                                {isLoading ? (
                                    <p>Loading comments...</p>
                                ) : comments.length === 0 ? (
                                    <p>No comments yet.</p>
                                ) : (
                                    comments.map((comment) => (
                                        <div
                                            key={comment._id}
                                            className="flex items-start space-x-4 border-b border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-300 mt-2 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{comment.createdBy.email}</p>
                                                <p className="text-sm text-gray-700">{comment.text}</p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                                    <span>{comment.createdAt.slice(0, 10)}</span>
                                                    {comment.createdBy.email === user.email && (
                                                        <button
                                                            onClick={() => handleDeleteComment(comment._id)}
                                                            className="text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button className="text-gray-500 hover:text-red-500 text-[16px] mb-1 mr-2">
                                                    <FavoriteBorderIcon className="text-[#E60023]" fontSize="small" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative flex items-center mt-4">
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            className="border p-2 w-full rounded-md text-black outline-none pr-10"
                            placeholder="Add a comment..."
                        />
                        <button
                            className="absolute right-24 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            🙂
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 right-0 z-10">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                        <button
                            className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-5 py-2 rounded-full text-sm ml-4"
                            onClick={handlePostComment}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
