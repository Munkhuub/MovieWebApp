import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Star, StarIcon } from "lucide-react";
import { MovieSimilar } from "../page";

type MoreLikeThisProps = {
  movieSimilar: MovieSimilar[];
};

export const MoreLikeThis = ({ movieSimilar }: MoreLikeThisProps) => {
  if (!movieSimilar) return null;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg lg:text-2xl font-semibold">More like this</h2>
        <Button
          variant="link"
          className="text-sm lg:text-base flex items-center gap-1 text-blue-600 lg:text-black"
        >
          <span>See more</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible">
        {!movieSimilar
          ? [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 lg:flex-shrink">
                <Skeleton className="w-24 lg:w-[190px] h-36 lg:h-[280px] mb-2 rounded-lg" />
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))
          : movieSimilar.slice(0, 5).map((similar, i) => (
              <div
                key={i}
                className="flex-shrink-0 lg:flex-shrink lg:h-auto lg:w-full lg:rounded-lg lg:shadow-sm lg:overflow-hidden lg:bg-white"
              >
                {similar?.poster_path && (
                  <div className="lg:w-full lg:h-[280px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                      alt={similar?.title}
                      className="w-24 lg:w-full h-36 lg:h-full object-cover rounded-lg lg:rounded-t-lg"
                    />
                  </div>
                )}
                <div className="lg:w-full lg:flex lg:flex-col lg:gap-2 lg:p-4">
                  <div className="flex items-center gap-1 mb-1 lg:mb-0 lg:gap-2">
                    <Star className="w-3 h-3 lg:hidden fill-yellow-400 text-yellow-400" />
                    <div className="lg:block hidden">
                      <StarIcon />
                    </div>
                    <div className="flex text-xs lg:text-sm">
                      <span className="font-medium lg:font-normal">
                        {similar?.vote_average.toString().slice(0, 3)}
                      </span>
                      <span className="text-gray-500 lg:text-[#71717A]">
                        /10
                      </span>
                    </div>
                  </div>
                  <p className="text-xs lg:text-lg font-medium lg:font-normal lg:tracking-tight">
                    {similar?.title}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
