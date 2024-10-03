'use client';

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

        // Using axios to upload the image
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
    <div className="upload-form mt-6">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}
