import { createSlice } from "@reduxjs/toolkit";
import { likeUnlikePin } from "@/lib/store/thunks/like-thunk";

interface LikeState {
  likeCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likeCount: 0,
  isLoading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeUnlikePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likeCount = action.payload.likeCount;
      })
      .addCase(likeUnlikePin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer;
