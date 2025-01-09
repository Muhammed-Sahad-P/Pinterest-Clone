import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface FollowPayload {
  followUserId: string;
  userId: string;
  followEmail: string;
}
//follow a user
export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ followUserId }: FollowPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/follow/${followUserId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to follow user",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//unfollow a user
export const unfollowUser = createAsyncThunk(
  "user/unfollow",
  async ({ followUserId }: FollowPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/users/unfollow/${followUserId}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to unfollow user",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//fetch followed users and followers
export const fetchFollowers = createAsyncThunk(
  "user/fetchFollowers",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/followers/${userId}`);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to fetch followers",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
