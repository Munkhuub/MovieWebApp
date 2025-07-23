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
  const [isDark, setIsDark] = useState(false);

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
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
        setLastPage(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [page, searchValue]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const currentPage = [page - 1, page, page + 1].filter(
    (p) => p > 1 && p < lastPage
  );

  const filteredSearchResults = searchResults.filter((item) => {
    if (selectGenreId === 0) return true;
    return item.genre_ids.includes(selectGenreId);
  });

  const handleToggleDark = () => setIsDark(!isDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <Navbar isDark={isDark} onToggleDark={handleToggleDark} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6 md:py-8 lg:py-12 flex flex-col gap-6 md:gap-8 bg-white dark:bg-gray-900">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
          Search results
        </h1>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="w-full lg:w-[360px] lg:pl-6 lg:border-l lg:border-slate-300 dark:lg:border-gray-700 lg:order-2">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold dark:text-white">
                  Genres
                </h1>
                <p className="text-sm md:text-base dark:text-gray-400">
                  See lists of movies by genre
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                {genres.map(({ id, name }) => (
                  <Badge
                    variant={selectGenreId === id ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    key={id}
                    onClick={() =>
                      setSelectGenreId(selectGenreId === id ? 0 : id)
                    }
                  >
                    {name}
                    <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 w-full lg:order-1">
            <div className="text-lg md:text-xl font-semibold dark:text-gray-300">
              {total} results for {title}
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-full w-full">
                      <Skeleton className="w-full aspect-[2/3] rounded-lg dark:bg-gray-800" />
                      <Skeleton className="mt-3 h-5 w-full dark:bg-gray-800" />
                      <Skeleton className="mt-2 h-4 w-3/4 dark:bg-gray-800" />
                    </div>
                  ))
                : filteredSearchResults.map((movie) => (
                    <Link
                      href={`/movie/${movie.id}`}
                      key={movie.id}
                      className="group"
                    >
                      <div className="h-full w-full rounded-lg shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] bg-white dark:bg-gray-800">
                        <div className="relative">
                          <img
                            className="w-full aspect-[2/3] object-cover rounded-t-lg"
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/placeholder-poster.jpg"
                            }
                            alt={movie.title}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="flex gap-1 items-center">
                              <StarIcon className="w-4 h-4 md:w-5 md:h-5" />
                              <div className="flex text-white text-sm md:text-base">
                                <span>
                                  {movie?.vote_average?.toFixed(1) || "N/A"}
                                </span>
                                <span className="text-gray-300">/10</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-base md:text-lg font-medium line-clamp-2 dark:text-white">
                            {movie?.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
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
      </div>
    </div>
  );
};
export default SearchPage;
