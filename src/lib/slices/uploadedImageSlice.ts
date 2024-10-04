import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Image = {
  url: string;
  name: string;
  date: string;
};

export interface ImageState {
  images: Array<Image>;
  searchQuery: string;
}

const initialState: ImageState = {
  images: JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("uploadedImages")) ||
      "[]"
  ),
  searchQuery: "",
};

export const UploadedImageSlice = createSlice({
  name: "uploadedImageSlice",
  initialState,
  reducers: {
    updateImagesState: (state, action: PayloadAction<Image>) => {
      const updatedImages = [...state.images, action.payload];
      if (typeof window !== "undefined") {
        localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
      }
      state.images = updatedImages;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { updateImagesState, setSearchQuery } = UploadedImageSlice.actions;

export default UploadedImageSlice.reducer;
