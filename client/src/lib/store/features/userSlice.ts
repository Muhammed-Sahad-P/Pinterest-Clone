import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signup } from "../thunks/user-thunks";
import Cookies from "js-cookie";
import { forgotPassword, resetPassword } from "../thunks/user-thunks";

interface UserState {
  currentAccount: string | null;
  user: { email: string; password: string } | null;
  loading: boolean;
  successMessage: string | null;
  loggedUser: { email: string; id: string; token: string } | null;
  error: string | null;
  forgetEmail: string | null;
  setForgetEmail: string | null;
}

const initialState: UserState = {
  currentAccount: null,
  user: null,
  loading: false,
  error: null,
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
