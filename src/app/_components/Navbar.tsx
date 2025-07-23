import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGenres } from "./GenreProvider";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ACCESS_TOKEN, Movie } from "./UpComing";
import { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "./assets/StarIcon";
import { ArrowRight } from "./assets/ArrowRight";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./assets/ArrowLeftIcon";
import { SunIcon } from "./assets/SunIcon";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export const Navbar = ({ isDark, onToggleDark }: NavbarProps) => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { genres } = useGenres();
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      if (!input.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${input}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    };

    const handler = setTimeout(() => {
      getMovies();
    }, 300);

    return () => clearTimeout(handler);
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleMobileSearchClose = () => {
    setShowMobileSearch(false);
    setInput("");
    setSearchResults([]);
  };

  const handleSearchSubmit = () => {
    if (input.trim()) {
      router.push(`/searchResult?searchValue=${input}`);
      handleMobileSearchClose();
    }
  };

  return (
    <div className="w-full lg:px-20 px-5 py-5 relative bg-white dark:bg-gray-900">
      <div className="w-full flex justify-between items-center">
        {!showMobileSearch && (
          <Link href="/" className="logo">
            <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA] dark:text-white">
              <LogoIcon className="dark:text-white" color="currentColor" />
              <p>Movie Z</p>
            </div>
          </Link>
        )}

        {showMobileSearch && (
          <div className="lg:hidden flex items-center w-full gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 dark:text-white"
              onClick={handleMobileSearchClose}
            >
              <ArrowLeftIcon />
            </Button>
            <div className="flex-1 flex gap-2 px-4 border rounded-md border-[#E4E4E7] dark:border-gray-700 items-center shadow-sm dark:bg-gray-800">
              <SearchIcon className="dark:text-gray-400" />
              <Input
                placeholder="Search movies..."
                className="border-none outline-none focus-visible:ring-transparent shadow-none flex-1 dark:bg-gray-800 dark:text-white"
                onChange={handleInputChange}
                value={input}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </div>
            <Button
              variant="ghost"
              onClick={handleSearchSubmit}
              disabled={!input.trim()}
              className="dark:text-white"
            >
              Go
            </Button>
          </div>
        )}

        <div className="lg:flex gap-3 hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 border-[1px] border-[#E4E4E7] dark:border-gray-700 shadow-sm px-[10px] py-2 rounded-md dark:bg-gray-800 dark:text-white">
              <ArrowDown className="dark:text-gray-400" /> Genre
            </DropdownMenuTrigger>
            <DropdownMenuContent className="lg:w-[577px] p-4 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="py-0 dark:text-white">
                <p className="text-2xl font-bold">Genres</p>
                <p className="dark:text-gray-400">
                  See lists of movies by genre
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <div className="flex flex-wrap gap-3 mt-2">
                {genres.map((item) => (
                  <Link href={`/genre?genre=${item.id}`} key={item.id}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700 py-2 rounded-full text-xs dark:border-gray-600 dark:text-gray-300"
                    >
                      {item.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-95 flex gap-2 px-4 border rounded-md border-[#E4E4E7] dark:border-gray-700 items-center shadow-sm dark:bg-gray-800">
            <SearchIcon className="dark:text-white" />
            <Input
              placeholder="Search movies..."
              className="border-none outline-none focus-visible:ring-transparent shadow-none dark:bg-gray-800 dark:text-white"
              onChange={handleInputChange}
              value={input}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                input.trim() &&
                router.push(`/searchResult?searchValue=${input}`)
              }
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex lg:hidden dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onClick={() => setShowMobileSearch(true)}
          >
            <SearchIcon />
          </Button>
          <Button
            variant="outline"
            onClick={onToggleDark}
            className="dark:bg-gray-800 dark:border-gray-700"
          >
            {isDark ? (
              <SunIcon className="text-yellow-400 dark:text-yellow-400 " />
            ) : (
              <MoonIcon className="text-gray-700 dark:text-gray-300" />
            )}
          </Button>
        </div>
      </div>

      {input.trim() && (
        <div className="lg:w-[577px] w-full px-5 py-5 absolute lg:left-[466px] left-0 top-full lg:top-[70px] z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          {searchResults.slice(0, 5).map((item) => (
            <Link
              href={`/movie/${item.id}`}
              key={item.id}
              onClick={() => {
                setInput("");
                setSearchResults([]);
                if (showMobileSearch) setShowMobileSearch(false);
              }}
            >
              <div className="flex gap-4 w-full h-[116px] rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex-shrink-0">
                  {item.poster_path ? (
                    <img
                      className="w-[67px] h-[100px] rounded-md object-cover"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-[67px] h-[100px] rounded-md bg-gray-200 dark:bg-gray-600 border border-dashed flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium line-clamp-1 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="flex text-xs items-center gap-1 mt-1 dark:text-gray-300">
                      <StarIcon className="dark:text-yellow-400" />
                      <span>{item.vote_average.toFixed(1)}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /10
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="dark:text-gray-400">
                      {item.release_date.split("-")[0]}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 dark:text-indigo-400">
                      See more <ArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="w-fit mt-2">
            <button
              className="flex items-center gap-2 text-sm mt-4 text-blue-600 dark:text-indigo-400 font-medium"
              onClick={() => {
                router.push(`/searchResult?searchValue=${input}`);
                setInput("");
                setSearchResults([]);
                if (showMobileSearch) setShowMobileSearch(false);
              }}
            >
              See all results for {input}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
