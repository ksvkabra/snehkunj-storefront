'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: { url: string; altText?: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        {images[selectedImage] && (
          <Image
            src={images[selectedImage].url}
            alt={images[selectedImage].altText || 'Product image'}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={selectedImage === 0}
          />
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 25vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 