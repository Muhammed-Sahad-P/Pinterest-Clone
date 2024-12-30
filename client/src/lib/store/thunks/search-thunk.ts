import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface SearchPayload {
  query: string;
}

//search
export const search = createAsyncThunk(
  "search/search",
  async ({ query }: SearchPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/search?searchTerm=${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to search",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
