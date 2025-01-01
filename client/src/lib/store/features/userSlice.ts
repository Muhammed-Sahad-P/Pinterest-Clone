import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  signup,
  updateUserProfile,
  googleLogin,
} from "../thunks/user-thunks";
import Cookies from "js-cookie";
import {
  forgotPassword,
  resetPassword,
  fetchUserProfile,
} from "../thunks/user-thunks";
import { User } from "@/types/user";

interface UserProfile {
  _id?: string;
  email: string;
  userName?: string;
  followers?: string[];
  following?: string[];
  firstName?: string;
  lastName?: string;
  image?: string;
  bio?: string;
  name?: string;
  boards?: string[];
  phoneNumber?: string;
}

interface UserState {
  currentAccount: string | null;
  user: User | null;
  followers: string[];
  following: string[];
  profilePicture: string | null;
  email: string | null;
  loading: boolean;
  userProfile: UserProfile | null;
  successMessage: string | null;
  loggedUser: { email: string; id: string; token: string } | null;
  error: string | null;
  forgetEmail: string | null;
  setForgetEmail: string | null;
}

const initialState: UserState = {
  currentAccount: null,
  user: null,
  followers: [],
  following: [],
  email: null,
  profilePicture: null,
  loading: false,
  error: null,
  userProfile: null,
  successMessage: null,
  loggedUser: null,
  forgetEmail: null,
  setForgetEmail: null,
};

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
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
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
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loggedUser = {
          email: action.payload.email,
          id: action.payload._id,
          token: action.payload.token,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Fetch user profile failed";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Update user profile failed";
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
