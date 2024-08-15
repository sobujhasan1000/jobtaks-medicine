"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
  data,
  autoScroll = true,
  interval = 3000, // Default interval of 3 seconds
}: {
  data: {
    image: string;
  }[];
  autoScroll?: boolean;
  interval?: number;
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let elem = carouselRef.current as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const scrollInterval = setInterval(() => {
      setCurrentImg((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(scrollInterval);
  }, [currentImg, data.length, interval, autoScroll]);

  return (
    <div className="">
      {/* Carousel container */}
      <div className="relative h-60 w-full overflow-hidden rounded-md md:h-80 lg:h-96 justify-center items-center">
        {/* Image container */}
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="absolute flex h-full w-full transition-all duration-300"
        >
          {/* Map through data to render images */}
          {data.map((v, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                className="pointer-events-none object-cover"
                alt={`carousel-image-${i}`}
                fill
                src={v.image || "https://random.imagecdn.app/500/500"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-3 flex justify-center space-x-4">
        <button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={`border px-4 py-2 font-bold text-gray-700 transition-opacity duration-200 hover:bg-gray-100 ${
            currentImg === 0 && "cursor-not-allowed opacity-50"
          }`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === data.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={`border px-4 py-2 font-bold text-gray-700 transition-opacity duration-200 hover:bg-gray-100 ${
            currentImg === data.length - 1 && "cursor-not-allowed opacity-50"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
