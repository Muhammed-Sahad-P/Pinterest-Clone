import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Signup
export const signup = createAsyncThunk(
  "user/signup",
  async (
    userData: {
      email: string;
      password: string;
      birthdate: string | Date;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Signup failed due to server error";
        return rejectWithValue({ message: errorMessage });
      }
      return rejectWithValue({ message: "Network or unknown error occurred" });
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/login", credentials);
      const { data } = response;
      const userData = data.data;
      Cookies.set(
        "user",
        JSON.stringify({
          email: userData.email,
          id: userData.id,
          token: userData.token,
        }),
        {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Login failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const userDetails = Cookies.get("user");
    const user = JSON.parse(userDetails || "");
    try {
      const response = await Instance.get(`/me/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Failed to fetch user profile",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string | null, { rejectWithValue }) => {
    try {
      const response = await Instance.post("/auth/forgotpassword", { email });
      return {
        message:
          response.data.message ||
          "Password reset link has been sent to your email.",
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Forgot Password Request failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { newPassword, token }: { newPassword: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.patch(`/auth/resetpassword/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Reset Password Request failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
