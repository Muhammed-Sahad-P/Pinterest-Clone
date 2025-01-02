import { createSlice } from "@reduxjs/toolkit";
import { search } from "@/lib/store/thunks/search-thunk";

interface SearchState {
  results: string[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

const initialState: SearchState = {
  results: [],
  isLoading: false,
  error: null,
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results || [];
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "An unknown error occurred.";
        state.results = [];
      });
  },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
