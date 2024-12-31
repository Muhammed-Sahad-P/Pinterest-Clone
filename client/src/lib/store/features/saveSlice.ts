import { createSlice } from "@reduxjs/toolkit";
import {
  savePin,
  unSavePin,
  fetchSavedPins,
} from "@/lib/store/thunks/save-thunk";
import { Pin } from "@/lib/types";
interface SaveState {
  savedPins: Pin[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SaveState = {
  savedPins: [],
  isLoading: false,
  error: null,
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedPins.push(action.payload.pinId);
      })
      .addCase(savePin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(unSavePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unSavePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedPins = state.savedPins.filter(
          (pinId) => pinId !== action.payload.pinId
        );
      })
      .addCase(unSavePin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSavedPins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSavedPins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedPins = action.payload.data;
      })
      .addCase(fetchSavedPins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default saveSlice.reducer;
