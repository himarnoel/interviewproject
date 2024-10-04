"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeModal } from "@/lib/slices/modalSlice";
import { gsap } from "gsap";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface UploadModalProps {
  onUploadSuccess: (url: string, name: string) => void; // Function to handle successful upload
}

const UploadModal: React.FC<UploadModalProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const count = useAppSelector((state) => state.modal);

  // Handle file selection via input or drag-and-drop
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Drag and drop file handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setUploading(true);
        const res = await axios.post(
          "/api/cloudinary",
          { image: reader.result },
          { headers: { "Content-Type": "application/json" } }
        );

        const data = res.data;
        if (data.url) {
          onUploadSuccess(data.url, file.name);
          toast.success("Uploaded Sucessfully!")
        }
      } catch (error) {
        console.error("Upload failed", error);
        toast.success("Upload Failed!")
      } finally {
        setUploading(false);
        setFile(null);
        handleClose();
      }
    };
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      gsap.set(modal, { autoAlpha: 0, y: -50 });
      gsap.to(modal, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  const handleClose = () => {
    const modal = modalRef.current;
    if (modal) {
      gsap.to(modal, {
        duration: 0.3,
        autoAlpha: 0,
        y: -50,
        ease: "power2.in",
        onComplete: () => {
          dispatch(closeModal());
        },
      });
    }
  };
  // Remove the selected file
  const handleRemoveFile = () => {
    setFile(null);
  };
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 lg:px-0 px-4 bg-opacity-45 backdrop-blur-md bg-black flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[550px] w-full py-8 bg-white rounded-[16px] shadow-lg px-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="font-extrabold text-[18px]">Media Upload</p>
            <p className="text-gray-500 text-[14px] font-medium">
              Upload your images fast and securely
            </p>
          </div>
          <button onClick={handleClose} className="text-xl">
            <AiOutlineClose />
          </button>
        </div>

        <div
          className={`${
            !file ? "p-14" : "p-5"
          } border-2 flex items-center justify-center flex-col mt-4 rounded-[8px] transition-all duration-200 
        ${
          dragging
            ? "border-black bg-black/20"
            : "border-gray-300 border-dashed "
        }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <RiUploadCloud2Line className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <p className="text-center">
                Drag your image here or{" "}
                <label className="font-bold cursor-pointer">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
            </>
          ) : (
            <>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected"
                className="w-64 object-contain mb-4 border border-black rounded-md"
              />
              <p className="text-sm text-gray-600">{file.name}</p>
              {!uploading && (
                <button
                  onClick={handleRemoveFile}
                  className="text-red-500 mt-4 flex items-center"
                >
                  <AiOutlineDelete className="mr-1" />
                  Remove File
                </button>
              )}
            </>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full py-3 text-white rounded-xl mt-4 transition duration-200 ${
            uploading || !file ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {uploading ? (
            <ClipLoader color="#000" loading={uploading} size={30} />
          ) : (
            " Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
