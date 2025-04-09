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
import { Navbar } from "../_components/Navbar";
import { StarIcon } from "../_components/assets/StarIcon";
import { input } from "framer-motion/client";
import { title } from "process";
import { PaginationComponent } from "../_components/Pagination";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("searchValue");

  const { genres } = useGenres();

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selectGenreId, setSelectGenreId] = useState(0);

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setSearchResults(data.results);
      setTotal(data.total_results);
      setTitle(data.title);
      setLoading(false);
      setLastPage(data.total_pages);
      console.log(data);
    };
    getMovies();
  }, [page, searchValue]);

  console.log();

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const currentPage = [page - 1, page, page + 1].filter(
    (p) => p > 1 && p < lastPage
  );

  const filteredSearchResults = searchResults.filter((item, index) => {
    if (item.genre_ids.includes(selectGenreId)) return true;
  });
  return (
    <div>
      <Navbar />
      <div className="px-20 py-12 flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Search results</h1>
        <div className="flex gap-4">
          <div className="flex flex-col gap-8">
            <div className="text-xl font-semibold ">
              {total} results for {title}
            </div>
            <div className="grid grid-cols-4 gap-12">
              {loading
                ? new Array(20).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-[165px] h-[330px]" />
                      <Skeleton className="mt-2" />
                    </div>
                  ))
                : selectGenreId === 0
                ? searchResults.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                      <div className="h-[330px] w-[165px] rounded-lg shadow-sm overflow-hidden">
                        <img
                          className="w-full h-[244px] bg-amber-50 rounded-t-lg"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <div className="w-full flex flex-col gap-2 ml-2 overflow-hidden">
                          <div className="flex gap-[8px] items-center">
                            <StarIcon />
                            <div className="flex">
                              <p>
                                {movie?.vote_average.toString().slice(0, 3)}
                              </p>
                              <p className="text-[#71717A]">/10</p>
                            </div>
                          </div>
                          <p className="text-[18px] tracking-tight">
                            {movie?.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                : filteredSearchResults.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                      <div className="h-[330px] w-[165px] rounded-lg shadow-sm overflow-hidden">
                        <img
                          className="w-full h-[244px] bg-amber-50 rounded-t-lg"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <div className="w-full flex flex-col gap-2 ml-2 overflow-hidden">
                          <div className="flex gap-[8px] items-center">
                            <StarIcon />
                            <div className="flex">
                              <p>
                                {movie?.vote_average.toString().slice(0, 3)}
                              </p>
                              <p className="text-[#71717A]">/10</p>
                            </div>
                          </div>
                          <p className="text-[18px] tracking-tight">
                            {movie?.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
          <div className="w-[1px] bg-slate-300" />
          <div className="w-[360px] flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-semibold">Genres</h1>
              <p>See lists of movies by genre</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {genres.map(({ id, name }) => (
                <Badge
                  // variant={genre === id.toString() ? "default" : "outline"}
                  className="flex items-center gap-2"
                  key={id}
                  onClick={() => setSelectGenreId(id)}
                >
                  {name}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <PaginationComponent
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentPage={currentPage}
          lastPage={lastPage}
          handlePage={handlePage}
          page={page}
        />
      </div>
    </div>
  );
};
export default SearchPage;
