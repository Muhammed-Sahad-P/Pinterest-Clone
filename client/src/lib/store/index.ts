import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import pinSlice from "./features/pinSlice";
import boardSlice from "./features/boardSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice,
      pin: pinSlice,
      board: boardSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
