"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "./assets/PlayIcon";
import { StarIcon } from "./assets/StarIcon";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface MovieSlide {
  path: string;
  alt: string;
  movieStatus: string;
  movieName: string;
  movieRating: string;
  description: string;
}

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const images: MovieSlide[] = [
    {
      path: "/images/hero/movie1.png",
      alt: "Movie slide 1",
      movieStatus: "Now Playing:",
      movieName: "Wicked",
      movieRating: "6.9/10",
      description:
        "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.",
    },
    {
      path: "/images/hero/movie2.png",
      alt: "Movie slide 2",
      movieStatus: "",
      movieName: "",
      movieRating: "",
      description: "",
    },
    {
      path: "/images/hero/movie3.png",
      alt: "Movie slide 3",
      movieStatus: "",
      movieName: "",
      movieRating: "",
      description: "",
    },
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
        {images.map((image, index) => {
          return (
            <div key={index} className="h-150 w-full object-cover min-w-full">
              <img src={image.path} alt={`Movie slide ${index + 1}`} />
              <div className="w-[302px] absolute top-[178px] left-[140px] text-white">
                <div>
                  <p>Now Playing:</p>
                  <h1>Wicked</h1>
                  <div className="flex gap-1">
                    <StarIcon />
                    <p>6.9/10</p>
                  </div>
                </div>
                <p></p>
                <Button variant="outline">
                  <PlayIcon />
                  <p>Watch Trailer</p>
                </Button>
              </div>
            </div>
          );
        })}
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
