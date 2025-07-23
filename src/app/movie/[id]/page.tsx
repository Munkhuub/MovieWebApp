"use client";
import { Footer } from "@/app/_components/Footer";
import { ACCESS_TOKEN } from "@/app/_components/UpComing";
import { StarIconBig } from "@/app/_components/assets/StarIconBig";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreLikeThis } from "./_components/MoreLikeThis";
import { Credits } from "./_components/Credits";
import { Navbar } from "@/app/_components/Navbar";
import { Star } from "lucide-react";
import { Play } from "next/font/google";
import { PlayIcon } from "@/app/_components/assets/PlayIcon";

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
export type MovieTeam = {
  cast: Cast[];
  crew: Crew[];
};
export type MovieSimilar = {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [isDark, setIsDark] = useState(false);

  const handleToggleDark = () => setIsDark(!isDark);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setOneMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setMovieTeam(data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    getCredits();
  }, [id]);

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setMovieSimilar(data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    getSimilar();
  }, [id]);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setTrailer(data?.results || []);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    getTrailer();
  }, [id]);

  const formatRuntime = (minutes: number | undefined | null) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen">
        <Navbar isDark={isDark} onToggleDark={handleToggleDark} />
        <div className="px-4 lg:px-20">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-48 w-full mb-6" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white min-h-screen sm:max-w-full lg:max-w-[1440px] lg:mx-auto ${
        isDark ? "dark" : ""
      }`}
    >
      <Navbar isDark={isDark} onToggleDark={handleToggleDark} />

      <div className="px-4 sm:px-6 lg:px-20 w-full">
        <div className="mb-4 lg:mb-6 lg:hidden">
          <h1 className="text-2xl font-bold mb-1">{oneMovie?.title}</h1>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 flex gap-1">
              <span>{oneMovie?.release_date}</span>
              <span>·</span>
              <span>PG</span>
              <span>·</span>
              <span>{formatRuntime(oneMovie?.runtime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex items-center">
                <span className="font-semibold text-base">
                  {oneMovie?.vote_average.toString().slice(0, 3)}
                </span>
                <span className="text-gray-500 text-sm">/10</span>
              </div>
              <span className="text-xs text-gray-500">
                {oneMovie?.vote_count}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="lg:w-[760px] lg:flex-shrink-0 mb-6 lg:mb-0">
            <div className="relative rounded-lg lg:rounded-sm overflow-hidden">
              {trailer[0]?.key ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer[0]?.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-48 lg:h-[428px] rounded-lg lg:rounded-sm"
                  title="Movie Trailer"
                ></iframe>
              ) : oneMovie?.poster_path ? (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/original${oneMovie.poster_path}`}
                    alt={oneMovie?.title}
                    className="w-full h-48 lg:w-full lg:h-[428px] object-cover"
                  />
                  <div className="lg:hidden absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-full text-white">
                      <PlayIcon />
                      <span className="text-sm">Play trailer</span>
                      <span className="text-sm">2:35</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-48 sm:h-60 md:h-72 lg:h-[428px] bg-gray-200 rounded-lg lg:rounded-sm flex items-center justify-center">
                  <p className="text-gray-500">No media available</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:flex-1">
            <div className="hidden lg:block mb-6">
              <h1 className="text-4xl font-bold mb-2">{oneMovie?.title}</h1>
              <div className="flex items-center justify-between">
                <div className="text-base text-gray-600 flex gap-1">
                  <span>{oneMovie?.release_date}</span>
                  <span>·</span>
                  <span>PG</span>
                  <span>·</span>
                  <span>{formatRuntime(oneMovie?.runtime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIconBig />
                  <div className="flex items-center">
                    <span className="font-semibold text-lg">
                      {oneMovie?.vote_average.toString().slice(0, 3)}
                    </span>
                    <span className="text-gray-500 text-base">/10</span>
                  </div>
                  <span className="text-xs text-[#71717A]">
                    {oneMovie?.vote_count}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {oneMovie?.genres?.map((genre, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs sm:text-sm lg:px-3 lg:py-1 lg:bg-gray-100 lg:text-gray-700 lg:rounded-full lg:border-none"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 mb-4">
                {oneMovie?.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${oneMovie.poster_path}`}
                    alt={oneMovie?.title}
                    className="lg:hidden w-16 h-24 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm lg:text-base text-gray-700 lg:text-black leading-relaxed">
                    {oneMovie?.overview}
                  </p>
                </div>
              </div>

              <Credits movieTeam={movieTeam} />
            </div>
          </div>
        </div>

        <MoreLikeThis movieSimilar={movieSimilar as MovieSimilar[]} />
      </div>

      <Footer />
    </div>
  );
}
