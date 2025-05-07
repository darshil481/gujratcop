import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface ToastInterface {
  message: string | null;
  type: string | null;
  id: number;
}

const initialState: ToastInterface[] = [];

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<ToastInterface>) {
      state.push(action.payload);
    },
    removeToast(state, action: PayloadAction<{ id: number }>) {
      return state.filter((toast) => toast.id !== action.payload.id);
    },
    removeAllToast() {
      return [];
    },
    resetToastSlice() {
      return initialState;
    },
  },
});

export const {
  setToast,
  removeToast,
  removeAllToast,
  resetToastSlice,
} = toastSlice.actions;

export const getToast = (state: RootState) => state.toast;

export const reducer = toastSlice.reducer;
