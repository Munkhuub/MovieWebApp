"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/hero/movie1.png",
    "/images/hero/movie2.png",
    "/images/hero/movie3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <div className="relative overflow-hidden mt-6">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {images.map((imagePath, index) => (
          <img
            key={index}
            src={imagePath}
            className="h-150 w-full object-cover min-w-full"
            alt={`Movie slide ${index + 1}`}
          />
        ))}
      </motion.div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handleNext}
      >
        →
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
