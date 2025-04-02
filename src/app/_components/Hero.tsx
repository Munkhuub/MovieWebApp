"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "./assets/PlayIcon";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StarIconBig } from "./assets/StarIconBig";
import { PlayIconWhite } from "./assets/PlayIconWhite";
import axios from "axios";

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
      path: "/images/hero/movie3.png",
      alt: "Movie slide 2",
      movieStatus: "Now Playing:",
      movieName: "Gladiator II",
      movieRating: "6.9/10",
      description:
        "After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.",
    },
    {
      path: "/images/hero/movie2.png",
      alt: "Movie slide 3",
      movieStatus: "Now Playing:",
      movieName: "Moana 2",
      movieRating: "6.9/10",
      description:
        "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
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
    <div className="relative overflow-hidden lg:mt-6">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="h-[425px] lg:h-150 w-full object-cover min-w-full relative"
            >
              <img
                src={image.path}
                alt={`Movie slide ${index + 1}`}
                className="aspect-3/2 object-cover "
              />
              <div className="text-black lg:w-[300px] absolute top-[250px] lg:top-[178px] left-5 lg:left-[140px] lg:text-white flex flex-col gap-4">
                <div>
                  <p>{image.movieStatus}</p>
                  <h1 className="text-4xl font-bold">{image.movieName}</h1>
                  <div className="flex gap-1 items-center">
                    <StarIconBig />
                    <p className="text-[18px]">{image.movieRating}</p>
                  </div>
                </div>
                <p className="text-xs">{image.description}</p>
                <Button
                  variant="default"
                  className="lg:bg-white lg:text-black w-[145px] h-10"
                >
                  <div className="hidden lg:block">
                    <PlayIcon />
                  </div>
                  <div className="block lg:hidden">
                    <PlayIconWhite />
                  </div>
                  <p>Watch Trailer</p>
                </Button>
              </div>
            </div>
          );
        })}
      </motion.div>

      <button
        className=" hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className=" hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handleNext}
      >
        →
      </button>
      <div className="absolute bottom-[380px] lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-1 lg:w-3 h-1 lg:h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
