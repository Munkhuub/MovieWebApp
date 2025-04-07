"use client";

import { Badge } from "@/components/ui/badge";
import { useGenres } from "../_components/GenreProvider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, Movie } from "../_components/UpComing";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  const { genres } = useGenres();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovies(data.results);

      setLoading(false);
    };

    getMovies();
  }, [genre]);

  return (
    <div className="flex gap-4 py-12">
      <div className="w-[360px] flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">Genres</h1>
          <p>See lists of movies by genre</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {genres.map(({ id, name }) => (
            <Link key={id} href={`/search?genre=${id}`}>
              <Badge
                variant={genre === id.toString() ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                {name}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-[1px] bg-slate-300" />

      <div className="flex-1 grid grid-cols-4 gap-12">
        {loading &&
          new Array(20).fill(0).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[200px]" />
              <Skeleton className="mt-2" />
            </div>
          ))}

        {!loading &&
          movies.map((movie) => {
            return (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div>
                  <img
                    alt="movie poster"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />

                  <p>{movie.title}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;
