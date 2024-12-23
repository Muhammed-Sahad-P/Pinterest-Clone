import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

//create pin
export const createPin = createAsyncThunk(
  "pin/createPin",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/pins", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to create pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//get all pins
export const fetchPins = createAsyncThunk(
  "pin/fetchPins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/pins/");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to Fetch pins",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//get pin by id
export const fetchPinById = createAsyncThunk(
  "pin/fetchPinById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/pins/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to Fetch pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//update pin by id
export const updatePin = createAsyncThunk(
  "pin/updatePin",
  async (
    { id, updateData }: { id: string; updateData: { title: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/pins/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to update pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//delete pin by id
export const deletePinById = createAsyncThunk(
  "pin/deletePinById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/pins/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Failed to delete pin",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
