"use client";

import ImageGallery from "@/components/ImageGallery";
import UploadModal from "@/components/UploadModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import { updateImagesState } from "@/lib/slices/uploadedImageSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageDescription, setImageDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  const handleUploadSuccess = (imageUrl: string, imageName: string) => {
    const newImage = {
      url: imageUrl,
      name: imageName,
      date: new Date().toLocaleString(),
    };

    dispatch(updateImagesState(newImage));
  };

  const { isModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">
        Image Repository
      </h1>
      {isModal && <UploadModal onUploadSuccess={handleUploadSuccess} />}

      {/* Search Input */}
      <div className="mb-6  max-w-[680px] w-full flex gap-4 mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search images"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 focus:outline-none p-3 border px-3   border-gray-300 rounded-xl "
          />
          <button className="bg-black absolute right-3  inset-y-1  text-white rounded-xl py-2 px-4">
            Search
          </button>
        </div>
        <button
          onClick={() => {
            dispatch(openModal());
          }}
          className="bg-black text-white rounded-xl py-2 px-8 whitespace-nowrap"
        >
          Add Images
        </button>
      </div>
      <ImageGallery />
    </div>
  );
}
