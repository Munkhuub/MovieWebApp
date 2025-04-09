"use client";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";
import { ACCESS_TOKEN } from "@/app/_components/UpComing";
import { StarIconBig } from "@/app/_components/assets/StarIconBig";
import axios from "axios";
import { data, i } from "framer-motion/client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/app/_components/assets/ArrowRight";
import { ChevronRight } from "lucide-react";
import { StarIcon } from "@/app/_components/assets/StarIcon";
import { PlayIcon } from "@/app/_components/assets/PlayIcon";
import { Skeleton } from "@/components/ui/skeleton";

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
  genres: Genres[];
};
type Genres = {
  name: string;
};
type Cast = {
  name: string;
};
type Crew = {
  name: string;
};
type MovieTeam = {
  cast: Cast[];
  crew: Crew[];
};
type MovieSimilar = {
  genre_ids: number[];
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};
type Trailer = {
  key: string;
};
export default function Home() {
  const { id } = useParams<Params>();
  const [oneMovie, setOneMovie] = useState<OneMovie | null>(null);
  const [movieTeam, setMovieTeam] = useState<MovieTeam | null>(null);
  const [movieSimilar, setMovieSimilar] = useState<MovieSimilar[] | null>(null);
  const [trailer, setTrailer] = useState<Trailer[]>([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false);
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovieTeam(data);
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovieSimilar(data.results);
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setTrailer(data?.results);
    };

    getMovie();
  }, [id]);
  console.log("hi", oneMovie);

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
        {loading ? (
          // Just the necessary skeleton loading components
          <>
            <div className="flex justify-between">
              <div>
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <div className="h-[428px] mt-6 mb-[34px] flex gap-8">
              <Skeleton className="w-[290px] h-full rounded-sm" />
              <Skeleton className="w-[760px] h-full rounded-sm" />
            </div>

            <div className="flex gap-3 mb-5">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            <Skeleton className="h-24 w-full mb-5" />

            <div className="space-y-5 mb-10">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </>
        ) : (
          // Original content
          <>
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
                        {oneMovie?.vote_average.toString().slice(0, 3)}
                      </p>
                      <p className="text-[#71717A]">/10</p>
                    </div>
                    <p className="text-xs text-[#71717A]">
                      {oneMovie?.vote_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[428px] mt-6 mb-[34px] flex gap-8">
              <img
                className="w-[290px] h-full rounded-sm"
                alt=""
                src={
                  "https://image.tmdb.org/t/p/original" + oneMovie?.poster_path
                }
              />
              <div className="w-[760px] h-full rounded-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer[0]?.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="object-cover h-full w-full rounded-sm"
                ></iframe>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                {oneMovie?.genres.map((item, i) => {
                  return (
                    <Badge variant="outline" key={i}>
                      {item.name}
                    </Badge>
                  );
                })}
              </div>
              <p>{oneMovie?.overview}</p>
              <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
                <p className="w-16">Director</p>
                <p>{movieTeam?.crew[0].name}</p>
              </div>
              <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
                <p className="w-16">Writers</p>
                <p>{movieTeam?.crew[5].name}</p>
              </div>
              <div className="w-full flex gap-[53px] border-b-[1px] border-[#E4E4E7]">
                <p className="w-16">Stars</p>
                <p>{movieTeam?.cast[0].name}</p>
              </div>
            </div>
          </>
        )}

        <div className="mt-9 flex flex-col gap-9 mb-[112px]">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">More like this</p>
            <Button variant="link">
              <p>See more</p>
              <ChevronRight />
            </Button>
          </div>
          <div className="flex gap-8">
            {!movieSimilar
              ? // Skeleton for similar movies while loading
                [1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-[372px] w-[190px] rounded-lg"
                  />
                ))
              : movieSimilar.slice(0, 5).map((similar, i) => {
                  return (
                    <div
                      className="h-[372px] w-[190px] rounded-lg shadow-sm overflow-hidden"
                      key={i}
                    >
                      <img
                        className="w-full h-[280px] bg-amber-50 rounded-t-lg"
                        src={`https://image.tmdb.org/t/p/original${similar?.poster_path}`}
                      ></img>
                      <div className="w-full flex flex-col gap-2 ml-2 overflow-hidden">
                        <div className="flex gap-[8px] items-center">
                          <StarIcon />
                          <div className="flex">
                            <p>
                              {similar?.vote_average.toString().slice(0, 3)}
                            </p>
                            <p className="text-[#71717A]">/10</p>
                          </div>
                        </div>
                        <p className="text-[18px] tracking-tight">
                          {similar?.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
