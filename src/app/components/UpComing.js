"use client";
import { StarIcon } from "./assets/StarIcon";
import { useState, useEffect } from "react";

export const UpComing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [];
  return (
    <div className="w-full my-13">
      <div></div>
      <div className="h-110 w-[230px]">
        <img src="" />
        <div>
          <div>
            <StarIcon />
            <div>6.9/10</div>
          </div>
          <p>Dear Santa</p>
        </div>
      </div>
    </div>
  );
};
