"use client";
import { ArrowRight } from "./assets/ArrowRight";
import { StarIcon } from "./assets/StarIcon";
import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "framer-motion/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjEyNzc4YjMyOWVkMDI4MTc0NTM0MzYxODhkYTZhYSIsIm5iZiI6MTc0MzQwNzAzMy4xNTgwMDAyLCJzdWIiOiI2N2VhNDdiOTUwNDBhNzViNGFlNTY0NDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.u36iE-gAX36Zt59VdM1ZC2n5g1rCzvXIUqKbDWHzJnM";
export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
};

export type Response = {
  results: Movie[];
  total_pages: number;
  total_result: number;
};

export const UpComing = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
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
        <p className="text-2xl font-semibold">Upcoming</p>
        <button
          className="flex items-center gap-2"
          onClick={() => router.push("/popular")}
        >
          <p>See more</p>
          <ArrowRight />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
        {movies.slice(0, 10).map((item, index) => {
          return (
            <Link href={`/movie/${item.id}`}>
              <div
                className="h-[309px] lg:h-110 w-[158px]lg:w-[230px] bg-[#F4F4F5] rounded-lg"
                key={index}
              >
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
