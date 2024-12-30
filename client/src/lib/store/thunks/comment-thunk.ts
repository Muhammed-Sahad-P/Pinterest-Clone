import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface CommentPayload {
  pinId: string;
  text: string;
  commentId: string;
}

//create a comment
export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ pinId, text }: CommentPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/comments/${pinId}`, { text });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to create comment",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//delete a comment
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ commentId }: CommentPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to delete comment",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
