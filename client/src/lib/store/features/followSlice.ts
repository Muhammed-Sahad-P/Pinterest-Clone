import { createSlice } from "@reduxjs/toolkit";
import { followUser, unfollowUser } from "../thunks/follow-thunk";

interface FollowState {
  following: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  following: [],
  isLoading: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following.push(action.payload.userId);
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = state.following.filter(
          (userId) => userId !== action.payload
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default followSlice.reducer;
