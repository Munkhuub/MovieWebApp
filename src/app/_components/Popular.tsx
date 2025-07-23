"use client";
import { ArrowRight } from "./assets/ArrowRight";
import { StarIcon } from "./assets/StarIcon";
import { useState, useEffect } from "react";
import { Movie } from "./UpComing";
import axios from "axios";
import { ACCESS_TOKEN } from "./UpComing";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Response = {
  results: Movie[];
};

export const Popular = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovies(data.results);
    };
    getMoviesByAxios();
  }, []);

  return (
    <div className="px-5 py-8 lg:px-20 lg:py-13 flex flex-col gap-8 lg:gap-[36px]">
      <div className="flex justify-between w-full h-[36px]">
        <p className="text-2xl font-semibold">Popular</p>
        <button
          className="flex items-center gap-2 dark:text-white"
          onClick={() => router.push("/popular")}
        >
          <p>See more</p>
          <ArrowRight />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
        {movies.slice(0, 10).map((item) => {
          return (
            <Link href={`/movie/${item.id}`} key={item.id} className="group">
              <div className="h-full w-full rounded-lg shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] bg-white dark:bg-gray-800">
                <div className="w-full aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                  />
                </div>
                <div className="p-3">
                  <div className="flex gap-2 items-center">
                    <StarIcon />
                    <div className="dark:text-gray-300">
                      {item.vote_average.toFixed(1)}/10
                    </div>
                  </div>
                  <p className="text-[18px] font-medium mt-1 line-clamp-2 dark:text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
