import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Image = {
  url: string;
  name: string;
  date: string;
};
export interface ImageState {
  images: Array<Image>;
}

const initialState: ImageState = {
  images: JSON.parse(localStorage.getItem("uploadedImages") || "[]"),
};

export const UploadedImageSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateImagesState: (state, action: PayloadAction<Image>) => {
      const updatedImages = [...state.images, action.payload];
       localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
      state.images = updatedImages;
    },
  },
});

export const { updateImagesState } = UploadedImageSlice.actions;

export default UploadedImageSlice.reducer;
