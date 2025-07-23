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

export const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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
  console.log(movies);

  return (
    <div className="px-5 py-8 lg:px-20 lg:py-13 flex flex-col gap-8 lg:gap-[36px]">
      <div className="flex justify-between w-full h-[36px]">
        <p className="text-2xl font-semibold">Top Rated</p>
        <button
          className="flex items-center gap-2"
          onClick={() => router.push("/topRated")}
        >
          <p>See more</p>
          <ArrowRight />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
        {movies.slice(0, 10).map((item, index) => {
          return (
            <Link href={`/movie/${item.id}`} key={index} className="group">
              <div className="h-full w-full rounded-lg shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] bg-white dark:bg-gray-800">
                <img
                  className="w-full h-[233px] lg:h-[340px] rounded-lg"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
                <div className="mt-3 ml-2 flex flex-col gap-2">
                  <div className="flex gap-[8px] items-center">
                    <StarIcon />
                    <div>{item.vote_average.toString().slice(0, 3)}/10</div>
                  </div>
                  <p className="text-[18px]">{item.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
