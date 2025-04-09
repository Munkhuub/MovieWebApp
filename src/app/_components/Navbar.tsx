import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { input } from "framer-motion/client";
import { StarIcon } from "./assets/StarIcon";
import { ArrowRight } from "./assets/ArrowRight";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const { genres } = useGenres();
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      if (!input.trim()) return;
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${input}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setSearchResults(data.results);
    };

    getMovies();
  }, [input]);
  console.log(input);

  type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

  const handleInputChange = (event: InputChangeEvent) => {
    setInput(event.target.value);
  };

  return (
    <div className="w-full lg:px-20 px-5 py-5 relative">
      <div className="w-full flex justify-between">
        <a href="/" className="logo">
          <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA]">
            <LogoIcon color="#4338CA" />
            <p>Movie Z</p>
          </div>
        </a>
        <div className="lg:flex gap-3 hidden ">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 border-[1px] border-[#E4E4E7] shadow-sm px-[10px] py-2 rounded-md">
              <ArrowDown /> Genre
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[577px] p-4">
              <DropdownMenuLabel className="py-0">
                <p className="text-2xl font-bold">Genres</p>
                <p>See lists of movies by genre</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="flex flex-wrap gap-3 mt-2">
                {genres.map((item) => (
                  <Link href={`/genre?genre=${item.id}`} key={item.id}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-100 py-2 rounded-full text-xs"
                    >
                      {item.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-95 flex gap-2 px-4 border rounded-md border-[#E4E4E7] items-center shadow-sm">
            <div className="">
              <SearchIcon />
            </div>
            <Input
              placeholder="Search.."
              className="border-none outline-none focus-visible:ring-transparent shadow-none"
              onChange={handleInputChange}
              value={input}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className=" flex lg:hidden">
            <SearchIcon />
          </Button>
          <Button variant="outline">
            <MoonIcon />
          </Button>
        </div>
      </div>
      <div className="lg:w-[577px] px-5 py-5 absolute left-[466px] z-10 bg-white rounded-lg">
        {searchResults.slice(0, 5).map((item, i) => (
          <Link href={`/movie/${item.id}`} key={i}>
            <div className="flex gap-4 lg:w-[553px] lg:h-[116px] shadow-xs rounded-lg p-2">
              <div>
                <img
                  className="w-[67px] h-[100px] rounded-md"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                ></img>
              </div>
              <div className="w-full flex flex-col gap-3">
                <div className="justify-center">
                  {item.title}

                  <div className="flex text-xs items-center gap-1">
                    <StarIcon />
                    <p>{item?.vote_average.toString().slice(0, 3)}</p>
                    <p className="text-[#71717A]">/10</p>
                  </div>
                </div>
                <div className="flex justify-between lg:h-[36px]">
                  <div className="text-[14px] mb-16px">{item.release_date}</div>
                  <button className="flex items-center gap-2 text-[14px] mt-[10px]">
                    <p>See more</p>
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {input.trim() && (
          <div className="w-fit mt-2">
            <button
              className="flex items-center gap-2 text-[14px] mt-[10px]"
              onClick={() => router.push(`/searchResult?searchValue=${input}`)}
            >
              <p>See all results for "{input}"</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
