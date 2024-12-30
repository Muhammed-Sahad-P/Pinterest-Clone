import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface LikePayload {
  pinId: string;
}

// Like & Unlike a Pin
export const likeUnlikePin = createAsyncThunk(
  "pin/likeUnlikePin",
  async ({ pinId }: LikePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/pins/like/${pinId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Failed to toggle like/unlike",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
