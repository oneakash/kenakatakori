"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const validImages = images.filter(Boolean);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-800">
        No image available
      </div>
    );
  }

  const currentImage = validImages[activeIndex];

  function previousImage() {
    setActiveIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    );
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <Image
          src={currentImage}
          alt={`${title} - Image ${activeIndex + 1}`}
          fill
          priority
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Previous */}
        {validImages.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
          >
            ‹
          </button>
        )}

        {/* Next */}
        {validImages.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
          >
            ›
          </button>
        )}

        {/* Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
            {activeIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                index === activeIndex
                  ? "border-black dark:border-white"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}