import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import pinSlice from "./features/pinSlice";
import boardSlice from "./features/boardSlice";
import commentSlice from "./features/commentSlice";
import followSlice from "./features/followSlice";
import likeSlice from "./features/likeSlice";
import saveSlice from "./features/saveSlice";
import searchSlice from "./features/searchSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice,
      pin: pinSlice,
      board: boardSlice,
      comment: commentSlice,
      follow: followSlice,
      like: likeSlice,
      save: saveSlice,
      search: searchSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
