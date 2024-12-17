import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UserState {
  user: { email: string; password: string } | null;
  loading: boolean;
  successMessage: string | null;
  loggedUser: { email: string; id: string; token: string } | null;
  error: string | null;
  forgetEmail: string | null;
  setForgetEmail: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  loggedUser: null,
  forgetEmail: null,
  setForgetEmail: null,
};

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/login", credentials);
      const { data } = response;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
    setForgetEmail: (state, action) => {
      state.forgetEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage = action.payload.message || "Signup successful!";
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedUser = {
          email: action.payload.email,
          id: action.payload._id,
          token: action.payload.token,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Login failed";
      });
  },
});

export const { setLoading, clearMessages, setForgetEmail } = userSlice.actions;

export default userSlice.reducer;
