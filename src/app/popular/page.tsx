"use client";
import Image from "next/image";
import { Navbar } from "../_components/Navbar";
import { ArrowRight } from "../_components/assets/ArrowRight";
import { StarIcon } from "../_components/assets/StarIcon";
import { Footer } from "../_components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, Movie, Response } from "../_components/UpComing";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const router = useRouter();

  const handlePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovies(data.results);
      setLastPage(data.total_pages);
    };
    getMoviesByAxios();
  }, [page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const currentPage = [page - 1, page, page + 1].filter(
    (p) => p > 1 && p < lastPage
  );

  return (
    <div className="lg:w-[1440px] m-auto">
      <Navbar />
      <div className="px-5 py-8 lg:px-20 lg:py-13 flex flex-col gap-8 lg:gap-[36px]">
        <div className="flex justify-between w-full h-[36px]">
          <p className="text-2xl font-semibold">Popular</p>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
          {movies.map((item, index) => {
            return (
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
            );
          })}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page === 1}
                onClick={() => handlePage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {currentPage.map((item, index) => {
              return (
                <PaginationItem key={index} className="flex gap-1">
                  <PaginationLink
                    onClick={() => handlePage(item)}
                    className={`${
                      page === item ? "border-[1px] border-[#E4E4E7]" : ""
                    }`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePage(lastPage)}>
                {lastPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}
