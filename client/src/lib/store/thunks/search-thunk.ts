import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface SearchPayload {
  query: string;
}

// search thunk
export const search = createAsyncThunk(
  "search/search",
  async ({ query }: SearchPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/search?searchTerm=${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to search";
        const errorCode = error.response?.status || "Unknown status";
        return rejectWithValue({ message: errorMessage, code: errorCode });
      }
      return rejectWithValue({
        message: "An unknown error occurred",
        code: "Unknown",
      });
    }
  }
);
