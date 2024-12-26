import { createSlice } from "@reduxjs/toolkit";
import {
  createPin,
  deletePinById,
  fetchPinById,
  fetchPins,
  updatePin,
} from "../thunks/pin-thunk";

interface Pin {
  _id: string;
  imageUrl: string;
}
interface PinState {
  _id: string;
  pins: Pin[];
  loading: boolean;
  title: string;
  error: string | null;
  description: string;
  imageUrl: string;
}

const initialState: PinState = {
  _id: "",
  pins: [],
  loading: false,
  error: null,
  title: "",
  description: "",
  imageUrl: "",
};

const pinSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPin.fulfilled, (state, action) => {
        state.loading = false;
        state.pins.push(action.payload);
      })
      .addCase(createPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePin.fulfilled, (state, action) => {
        state.loading = false;
        state.pins = state.pins.map((pin) =>
          pin === action.payload._id ? action.payload : pin
        );
      })
      .addCase(updatePin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(fetchPins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPins.fulfilled, (state, action) => {
        state.loading = false;
        state.pins = action.payload;
      })
      .addCase(fetchPins.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(fetchPinById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPinById.fulfilled, (state, action) => {
        state.loading = false;
        const pin = state.pins.find((p) => p === action.payload._id);
        if (!pin) state.pins.push(action.payload);
      })
      .addCase(fetchPinById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(deletePinById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePinById.fulfilled, (state, action) => {
        state.loading = false;
        state.pins = state.pins.filter((pin) => pin !== action.payload._id);
      })
      .addCase(deletePinById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      });
  },
});
export default pinSlice.reducer;
