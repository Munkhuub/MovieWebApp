"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "./assets/PlayIcon";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StarIconBig } from "./assets/StarIconBig";
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
        <div className="h-[425px] lg:h-[600px] w-full">
          <Skeleton className="w-full h-full" />
          <div className="absolute top-[200px] sm:top-[250px] lg:top-[200px] left-4 sm:left-6 lg:left-[140px] flex flex-col gap-2 sm:gap-4">
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
            <Skeleton className="h-6 sm:h-8 w-40 sm:w-48" />
            <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
            <Skeleton className="h-12 sm:h-16 w-full max-w-xs sm:max-w-md" />
            <Skeleton className="h-8 sm:h-10 w-[120px] sm:w-[145px]" />
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
              className="h-[425px] lg:h-[600px] w-full min-w-full relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${image.poster_path}`}
                alt={`Movie slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-transparent" />

              <div className="absolute bottom-6 sm:bottom-8 lg:top-[180px] lg:bottom-auto left-4 sm:left-6 lg:left-[140px] text-white flex flex-col gap-2 sm:gap-3 lg:gap-4 max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[400px]">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Now Playing</p>
                  <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-tight">
                    {image.title}
                  </h1>
                  <div className="flex gap-1 items-center mt-1 sm:mt-2">
                    <StarIconBig />
                    <p className="text-sm sm:text-base lg:text-[18px]">
                      {image.vote_average.toString().slice(0, 3)}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm lg:text-base line-clamp-3 opacity-90">
                  {image.overview}
                </p>

                <Button
                  variant="default"
                  className="bg-white text-black hover:bg-gray-100 w-fit px-4 py-2 h-8 sm:h-9 lg:h-10 text-xs sm:text-sm"
                >
                  <div className="lg:block">
                    <PlayIcon />
                  </div>
                  <span className="ml-1 sm:ml-2">Watch Trailer</span>
                </Button>
              </div>
            </div>
          );
        })}
      </motion.div>

      <button
        className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full text-black font-bold transition-colors"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full text-black font-bold transition-colors"
        onClick={handleNext}
      >
        →
      </button>

      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {moviesNow.slice(0, 3).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
