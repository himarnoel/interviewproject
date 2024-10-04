"use client";

import ImageGallery from "@/components/ImageGallery";
import UploadModal from "@/components/UploadModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import {
  setSearchQuery,
  updateImagesState,
} from "@/lib/slices/uploadedImageSlice";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  const handleUploadSuccess = (imageUrl: string, imageName: string) => {
    const newImage = {
      url: imageUrl,
      name: imageName,
      date: new Date().toLocaleString(),
    };
    dispatch(updateImagesState(newImage));
  };

  const { isModal } = useAppSelector((state) => state.modal);
  const { searchQuery } = useAppSelector((state) => state.uploadedImages);

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow p-4 flex justify-between items-center">
        <Link href="/" className="inline-block">
          <Image
            src={logo}
            alt="logo"
            className="w-[6rem] lg:w-[10rem] object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Search Section */}
          <div className="flex gap-4 p-1 py-2 w-full max-w-[400px] border px-2 items-center border-gray-300 rounded-xl">
            <FiSearch className="text-gray-500 text-2xl" />
            <input
              type="text"
              placeholder="Search images"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full focus:outline-none"
            />
          </div>

          {/* Add Images Button */}
          <button
            onClick={() => dispatch(openModal())}
            className="bg-black text-white rounded-xl py-2 px-4 flex items-center whitespace-nowrap"
          >
            <FiPlus className="mr-2" />
            <span>Add Image</span>
          </button>
        </div>
      </header>

      <main className="pt-20">
        {isModal && <UploadModal onUploadSuccess={handleUploadSuccess} />}
        <ImageGallery />
      </main>
    </div>
  );
}
