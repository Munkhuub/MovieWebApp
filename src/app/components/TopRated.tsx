"use client";
import { ArrowRight } from "./assets/ArrowRight";
import { StarIcon } from "./assets/StarIcon";
import { useState, useEffect } from "react";
const cards = [
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },

  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
  {
    img: `/images/upcoming/movieSanta.png`,
    review: `6.9`,
    movieName: `Dear Santa`,
  },
];

export const TopRated = () => {
  return (
    <div className="px-20 py-13 flex flex-col gap-[36px]">
      <div className="flex justify-between w-full h-[36px]">
        <p className="text-2xl font-semibold">Top Rated</p>
        <button className="flex items-center gap-2">
          <p>See more</p>
          <ArrowRight />
        </button>
      </div>
      <div className="w-full grid grid-cols-5 gap-8">
        {cards.map((item, index) => {
          return (
            <div
              className="h-110 w-[230px] bg-[#F4F4F5] rounded-lg"
              key={index}
            >
              <img className="w-full h-[340px]" src={item.img} />
              <div className="mt-3 ml-2 flex flex-col gap-2">
                <div className="flex gap-[8px] items-center">
                  <StarIcon />
                  <div>{item.review}/10</div>
                </div>
                <p className="text-[18px]">{item.movieName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
