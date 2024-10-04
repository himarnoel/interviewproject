import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/modalSlice";
import UploadedImageReducer from "./slices/uploadedImageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: ModalReducer,
      uploadedImages: UploadedImageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
