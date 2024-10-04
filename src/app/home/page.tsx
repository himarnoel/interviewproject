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

export default function Home() {
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
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow p-4">
        <Image
          src={logo}
          alt="logo"
          className=" w-[6rem] lg:w-[10rem] object-contain"
        />

        <div className="mb-6 max-w-[700px] w-full flex lg:flex-row flex-col  items-center gap-4 mx-auto">
          <div className="flex gap-4 p-1  w-full border justify-between px-2 items-center border-gray-300 rounded-xl ">
            <FiSearch className=" text-gray-500 text-3xl" />
            <input
              type="text"
              placeholder="Search images"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full focus:outline-none "
            />
            <button className="bg-black  text-white rounded-xl py-2 px-4">
              Search
            </button>
          </div>
          <button
            onClick={() => {
              dispatch(openModal());
            }}
            className="bg-black whitespace-nowrap  text-white rounded-xl py-3 px-4 flex items-center"
          >
            <span> Add Images</span>
            <FiPlus className="mr-2" />
          </button>
        </div>
      </header>

      <main className="pt-32">
        {isModal && <UploadModal onUploadSuccess={handleUploadSuccess} />}
        <ImageGallery />
      </main>
    </div>
  );
}
