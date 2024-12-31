import { createSlice } from "@reduxjs/toolkit";
import { saveUnsavePin, fetchSavedPins } from "@/lib/store/thunks/save-thunk";
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
      .addCase(saveUnsavePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveUnsavePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedPins.push(action.payload.pinId);
      })
      .addCase(saveUnsavePin.rejected, (state, action) => {
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
