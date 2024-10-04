'use client'

import ImageGallery from "@/components/ImageGallery";
// import UploadForm from "@/components/UploadForm"; // Corrected typo in the import path
import { useEffect, useState } from 'react';

export default function Home() {
  const [imageDescription, setImageDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    setUploadedImages(storedImages);
  }, []);

  const handleUploadSuccess = (imageUrl: string, imageName: string) => {
    const newImage = {
      url: imageUrl,
      name: imageName,
      description: imageDescription, // Store the description
      date: new Date().toLocaleString(),
    };

    const updatedImages = [...uploadedImages, newImage];
    setUploadedImages(updatedImages); // Update the local state
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

    // Clear the input field after upload
    setImageDescription('');
  };



  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">
        Image Repository
      </h1>

      {/* Search Input */}
      <div className="mb-6  max-w-[500px] flex gap-4 mx-auto">
        <input
          type="text"
          placeholder="Search images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-1 focus:outline-none p-3 border   border-gray-300 rounded-lg "
        />
        <button  className="bg-black text-white rounded-xl py-2 px-4">Search</button>
      </div>

      {/*
      </div>

      {/* <UploadForm onUploadSuccess={handleUploadSuccess} /> */}
      
      {/* Display Filtered Images */}
      <ImageGallery  />
    </div>
  );
}
