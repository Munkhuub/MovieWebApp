"use client";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";
import { ACCESS_TOKEN } from "@/app/_components/UpComing";
import { StarIconBig } from "@/app/_components/assets/StarIconBig";
import axios from "axios";
import { data } from "framer-motion/client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/app/_components/assets/ArrowRight";
import { ChevronRight } from "lucide-react";

type Params = {
  id: string;
};

export type OneMovie = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export default function Home() {
  const { id } = useParams<Params>();
  const [oneMovie, setOneMovie] = useState<OneMovie | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setOneMovie(data);
    };

    getMovie();
  }, [id]);

  // useEffect(() => {
  //   const getMovie = async () => {
  //     const { data } = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${ACCESS_TOKEN}`,
  //         },
  //       }
  //     );

  //     setOneMovie(data);
  //   };

  //   getMovie();
  // }, []);

  console.log(oneMovie);

  const formatRuntime = (minutes: number | undefined | null) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="lg:w-[1440px] m-auto">
      <Navbar />
      <div className="px-45">
        <div className="flex justify-between">
          <div>
            <p className="text-4xl font-bold">{oneMovie?.title}</p>
            <div className="flex">
              <div>2024.11.26</div>·<div>PG</div>·
              <div>{formatRuntime(oneMovie?.runtime)}</div>
            </div>
          </div>

          <div>
            <p className="text-xs">Rating</p>
            <div className="flex items-center gap-1">
              <StarIconBig />
              <div>
                <div className="flex items-center">
                  <p className="text-[18px] font-semibold">
                    {oneMovie?.vote_average}
                  </p>
                  <p className="text-[#71717A]">/10</p>
                </div>
                <p className="text-xs text-[#71717A]">{oneMovie?.vote_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[428px] mt-6 mb-[34px] flex gap-8">
          <img
            className="w-[290px] h-full"
            alt=""
            src={"https://image.tmdb.org/t/p/original" + oneMovie?.poster_path}
          />
          <div className="w-[760px] bg-black">
            <img />
            <video></video>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Badge variant="outline">Pop Musical</Badge>
            <Badge variant="outline">Pop Musical</Badge>
            <Badge variant="outline">Pop Musical</Badge>
            <Badge variant="outline">Pop Musical</Badge>
            <Badge variant="outline">Pop Musical</Badge>
          </div>
          <p>{oneMovie?.overview}</p>
          <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
            <p className="w-16">Director</p>
            <p>Jon M. Chu</p>
          </div>
          <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
            <p className="w-16">Writers</p>
            <p>Jon M. Chu</p>
          </div>
          <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
            <p className="w-16">Stars</p>
            <p>Jon M. Chu</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-2xl font-semibold">
          <p>More like this</p>
          <Button variant="link">
            <p>See more</p>
            <ChevronRight />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
