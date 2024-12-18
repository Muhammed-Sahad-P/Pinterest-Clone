import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

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

//fetch User Profile
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

//forget password
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

//reset password
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("user");
      state.loggedUser = null;
      state.error = null;
      state.forgetEmail = null;
    },
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
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Forgot Password Request failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage =
          action.payload.message || "Password reset successful!";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Reset Password Request failed";
      });
  },
});

export const { logout, setLoading, clearMessages, setForgetEmail } =
  userSlice.actions;

export default userSlice.reducer;
