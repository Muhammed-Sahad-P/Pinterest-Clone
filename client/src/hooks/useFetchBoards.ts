"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/store/hooks";
import { fetchBoards } from "@/lib/store/thunks/board-thunk";

export const useFetchBoards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, loading, error } = useAppSelector(
    (state: RootState) => state.board
  );

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return { boards, loading, error };
};
