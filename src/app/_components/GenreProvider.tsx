"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACCESS_TOKEN } from "./UpComing";
import axios from "axios";

type Genre = {
  id: number;
  name: string;
};

type GenreContextType = {
  genres: Genre[];
};

const GenreContext = createContext<GenreContextType>({
  genres: [],
});

export const GenreProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setGenres(data.genres);
    };

    getGenres();
  }, []);
  console.log(genres);
  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};

export const useGenres = () => useContext(GenreContext);
