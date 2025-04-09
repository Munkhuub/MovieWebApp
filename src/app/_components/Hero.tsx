"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "./assets/PlayIcon";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StarIconBig } from "./assets/StarIconBig";
import { PlayIconWhite } from "./assets/PlayIconWhite";
import axios from "axios";
import { ACCESS_TOKEN, Movie } from "./UpComing";
import { Skeleton } from "@/components/ui/skeleton";

type Response = {
  results: Movie[];
};

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [moviesNow, setMoviesNow] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const { data } = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setMoviesNow(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    getMoviesByAxios();
  }, []);

  useEffect(() => {
    if (moviesNow.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const movieCount = Math.min(moviesNow.length, 3);
        if (prevIndex === movieCount - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [moviesNow]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === moviesNow.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return moviesNow.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden lg:mt-6">
        <div className="h-[425px] lg:h-150 w-full">
          <Skeleton className="w-full h-full" />
          <div className="absolute top-[250px] lg:top-[178px] left-5 lg:left-[140px] flex flex-col gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full max-w-md" />
            <Skeleton className="h-10 w-[145px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden lg:mt-6">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {moviesNow.slice(0, 3).map((image, index) => {
          return (
            <div
              key={index}
              className="h-[425px] lg:h-150 w-full object-cover min-w-full relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${image.poster_path}`}
                alt={`Movie slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="text-black lg:w-[300px] absolute top-[250px] lg:top-[178px] left-5 lg:left-[140px] lg:text-white flex flex-col gap-4">
                <div>
                  <p>Now Playing</p>
                  <h1 className="text-4xl font-bold">{image.title}</h1>
                  <div className="flex gap-1 items-center">
                    <StarIconBig />
                    <p className="text-[18px]">
                      {image.vote_average.toString().slice(0, 3)}
                    </p>
                  </div>
                </div>
                <p className="text-xs">{image.overview}</p>
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
        className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 size-10 bg-white bg-opacity-50 p-2 rounded-[50%] text-black"
        onClick={handleNext}
      >
        →
      </button>
      <div className="absolute bottom-[380px] lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {moviesNow.slice(0, 3).map((_, index) => (
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
