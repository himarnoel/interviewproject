import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isModal: boolean;
}

const initialState: ModalState = {
  isModal: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
    },
  },
});


export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
