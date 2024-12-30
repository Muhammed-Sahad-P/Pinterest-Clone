import { createSlice } from "@reduxjs/toolkit";
import { search } from "@/lib/store/thunks/search-thunk";

interface SearchState {
  results: unknown[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
