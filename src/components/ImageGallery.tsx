"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import Image from "next/image";
import { FiDownload, FiShare2, FiPlus } from "react-icons/fi";

type Image = {
  url: string;
  name: string;
  date: string;
};

export default function ImageGallery() {
  const dispatch = useAppDispatch();
  const { images, searchQuery } = useAppSelector(
    (state) => state.uploadedImages
  );

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  // Handle image share
  const handleShare = (url: string) => {
    console.log("Sharing:", url);
  };

  return (
    <div className="image-gallery mt-6 lg:mt-10">
      {/* Empty State - No Images Available */}
      {images.length === 0 && (
        <div className="text-center mt-10 flex items-center flex-col justify-center">
          <p className="text-gray-500">
            No images available. Please upload some images.
          </p>
          <button
            onClick={() => dispatch(openModal())}
            className="mt-4 bg-black text-white rounded-xl py-3 px-4 flex items-center"
          >
            <FiPlus className="mr-2" />
            <span>Add Image</span>
          </button>
        </div>
      )}

      {images.length > 0 && filteredImages.length === 0 && (
        <div className="text-center mt-10 max-w-[200px] mx-auto">
          <p className="text-gray-500 truncate" title={searchQuery}>
            No matching results for "{searchQuery}".
          </p>
        </div>
      )}

      {filteredImages.length > 0 && (
        <div className=" flex flex-wrap justify-center sm:grid  sm:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-8 sm:gap-6">
          {filteredImages
            .slice()
            .reverse()
            .map((image, index) => (
              <div
                key={index}
                className="image-card relative group rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={image.url}
                    alt={image.name}
                    width={300}
                    height={200}
                    className="w-full object-cover rounded-lg"
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleDownload(image.url, image.name)}
                    className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  >
                    <FiDownload size={24} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
