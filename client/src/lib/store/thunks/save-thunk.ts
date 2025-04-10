import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

interface SavePayload {
  pinId: string;
}

//Save a pin
export const saveUnsavePin = createAsyncThunk(
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

//get all saved pins
export const fetchSavedPins = createAsyncThunk(
  "save/fetchSavedPins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/pins/save/saved");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to fetch saved pins",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
