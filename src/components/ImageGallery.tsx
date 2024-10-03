// app/components/ImageGallery.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Image = {
  url: string;
  name: string;
  date: string;
};

export default function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
    setImages(storedImages);
  }, []);

  return (
    <div className="image-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {images.map((image, index) => (
        <div key={index} className="image-card   bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="relative h-64">  <Image src={image.url} alt={image.name} fill={true}   className="w-full  object-cover rounded-lg" /></div>
          <p className="mt-2 text-lg font-semibold">{image.name}</p>
          <p className="text-sm text-gray-500">{image.date}</p>
        </div>
      ))}
    </div>
  );
}
