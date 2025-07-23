"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, Movie, Response } from "../_components/UpComing";

import { MoviesCard } from "../popular/_components/MoviesCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const handlePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("upcoming page fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    getMoviesByAxios();
  }, [page]);

  const handleToggleDark = () => setIsDark(!isDark);
  return (
    <MoviesCard
      page={page}
      lastPage={lastPage}
      movies={movies}
      loading={loading}
      isDark={isDark}
      handlePage={handlePage}
      handleToggleDark={handleToggleDark}
    />
  );
}
