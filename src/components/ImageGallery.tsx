"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiDownload, FiShare2 } from "react-icons/fi"; // Importing icons

type Image = {
  url: string;
  name: string;
  date: string;
};

export default function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    setImages(storedImages);
  }, []);

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
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
  

  const handleShare = (url: string) => {
    console.log("Sharing:", url);
  };

  return (
    <div className="image-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-items-start gap-6 mt-8">
      {images.map((image, index) => (
        <div key={index} className="image-card relative group rounded-lg overflow-hidden">
          <div className="relative ">
            <img
              sizes="1"
              src={image.url}
              alt={image.name}
              // fill={true}
              className="w-full object-cover rounded-lg"
            />
          </div>
          {/* Icon container */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={() => handleDownload(image.url, image.name)} className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <FiDownload size={24} />
            </button>
            <button onClick={() => handleShare(image.url)} className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <FiShare2 size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
