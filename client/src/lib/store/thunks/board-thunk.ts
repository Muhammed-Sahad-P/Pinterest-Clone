import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/boards", {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue({
          message: error.response.data.message || "Failed to create board",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//fetch all boards
export const fetchBoards = createAsyncThunk(
  "board/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/boards");
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue({
          message: error.response.data.message || "Failed to fetch boards",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//fetch board by id
export const fetchBoardById = createAsyncThunk(
  "board/fetchBoardById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/boards/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to fetch board",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//update board by id
export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async (
    { id, updateData }: { id: string; updateData: { title: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/boards/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to update board",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//delete board by id
export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/boards/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to delete board",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
