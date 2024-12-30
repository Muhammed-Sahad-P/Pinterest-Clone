import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface SavePayload {
  pinId: string;
}

//Save a pin
export const savePin = createAsyncThunk(
  "save/savePin",
  async ({ pinId }: SavePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/pins/save/${pinId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to save pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//Unsave a pin
export const unSavePin = createAsyncThunk(
  "save/unSavePin",
  async ({ pinId }: SavePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/pins/save/${pinId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to unsave pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
