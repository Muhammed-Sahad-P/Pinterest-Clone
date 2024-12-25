import { createSlice } from "@reduxjs/toolkit";
import {
  createBoard,
  fetchBoards,
  fetchBoardById,
  updateBoard,
  deleteBoard,
} from "../thunks/board-thunk";

export interface Board {
  _id: string;
  name: string;
  data: string;
}

interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
  board?: Board;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.boards)) {
          state.boards.push(action.payload);
        } else {
          state.boards = [action.payload];
        }
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || null;
      });
  },
});

export default boardSlice.reducer;
