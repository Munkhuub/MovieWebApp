import { StarIcon } from "@/app/_components/assets/StarIcon";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";
import { PaginationComponent } from "@/app/_components/Pagination";
import { Movie } from "@/app/_components/UpComing";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";

type MoviesCardProps = {
  page: number;
  lastPage: number;
  movies: Movie[];
  loading: boolean;
  isDark: boolean;
  handlePage: (page: number) => void;
  handleToggleDark: () => void;
};

export const MoviesCard = ({
  page,
  lastPage,
  movies,
  loading,
  isDark,
  handlePage,
  handleToggleDark,
}: MoviesCardProps) => {
  const handleNext = () => {
    handlePage(page + 1);
  };

  const handlePrev = () => {
    handlePage(page - 1);
  };

  const currentPage = [page - 1, page, page + 1].filter(
    (p) => p > 1 && p < lastPage
  );

  return (
    <div className={isDark ? "dark" : ""}>
      <Navbar isDark={isDark} onToggleDark={handleToggleDark} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-6 md:py-8 lg:py-12 flex flex-col gap-8 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
            Popular Movies
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-full w-full">
                  <Skeleton className="w-full aspect-[2/3] rounded-lg dark:bg-gray-800" />
                  <Skeleton className="mt-3 h-5 w-3/4 dark:bg-gray-800" />
                  <Skeleton className="mt-2 h-4 w-full dark:bg-gray-800" />
                </div>
              ))
            : movies.map((item) => (
                <Link
                  href={`/movie/${item.id}`}
                  key={item.id}
                  className="group"
                >
                  <div className="h-full w-full rounded-lg shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] bg-white dark:bg-gray-800">
                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/placeholder-poster.jpg"
                        }
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
                      <p className="text-base md:text-lg font-medium mt-1 line-clamp-2 dark:text-white">
                        {item.title}
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
      <Footer />
    </div>
  );
};
