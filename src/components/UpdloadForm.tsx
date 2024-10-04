"use client";

import { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ onUploadSuccess }: { onUploadSuccess: (url: string, name: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setUploading(true);

        // Upload the image to the server
        const res = await axios.post('/api/cloudinary',
          { image: reader.result },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const data = res.data;
        if (data.url) {
          onUploadSuccess(data.url, file.name);
        }
      } catch (error) {
        console.error('Upload failed', error);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div className="upload-form mt-10 p-8 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Upload Your Image</h2>
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-6 text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-gray-700"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-3 text-center rounded-lg font-semibold transition duration-200 ease-in-out
            ${uploading || !file ? 'bg-gray-400 text-gray-300' : 'bg-black text-white hover:bg-gray-800'}
          `}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
}
