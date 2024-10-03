"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // Import the hook

export default function Home() {
  gsap.registerPlugin(useGSAP);
  // Get gsap from useGSAP

  // Page Load Animation with GSAP
  useGSAP(() => {
    const header = ".header";
    const uploadBox = ".upload-box";
    const uploadButton = ".upload-button";
    const dragtext = ".dragtext";
    const uploadtext = ".uploadtext";
    const footer = ".footer";

    gsap.from(header, {
      opacity: 0,
      y: -100,
      duration: 1.5,
      delay: 0.5,
      ease: "power4.out",
    });

    gsap.from(uploadtext, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 1.6,
      ease: "power4.out",
    });
  
    gsap.from(uploadBox, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      delay: 1.5,
      ease: "power4.out",
    });
   
    gsap.from(dragtext, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });

    
    gsap.from(uploadButton, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 2.5,
      ease: "power4.out",
    });

   
    gsap.from(footer, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 3,
      ease: "power4.out",
    });
  }); 

 
  const hoverEffect = () => {
    gsap.to(".upload-button", {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const hoverEffectReset = () => {
    gsap.to(".upload-button", {
      scale: 1,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r px-4 lg:px-0 from-blue-600 via-purple-600 to-pink-600 flex flex-col justify-center items-center text-white">
      {/* Header Section */}
      <header className="header text-center mb-16">
        <h1 className="text-5xl font-extrabold leading-tight">
          Effortlessly Upload Your Images
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          A simple and fast image upload experience, powered by Cloudinary.
        </p>
      </header>

      {/* Upload Box */}
      <div className="upload-box w-full max-w-xl bg-white bg-opacity-10 p-8 rounded-xl shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl uploadtext font-semibold text-gray-200 mb-8 text-center">
          Upload Your Images
        </h2>

        {/* Upload Section */}
        <div className="flex justify-center items-center">
          <div className="bg-white border-dashed border-2 p-12 rounded-xl text-center w-full max-w-md">
            <p className="text-gray-400 text-lg mb-6 dragtext">
              Drag & Drop or Click to Upload
            </p>
            <button
              onMouseEnter={hoverEffect}
              onMouseLeave={hoverEffectReset}
              className="upload-button bg-indigo-600 text-white px-6 py-2 rounded-full text-lg hover:bg-indigo-700"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Explore More Link */}
        <div className="text-center mt-6 footer">
          <p>Built by Emmanuel Olaniyi</p>
        </div>
      </div>
    </div>
  );
}
