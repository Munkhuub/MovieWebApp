"use client";
import { Footer } from "@/app/_components/_Footer";
import { Navbar } from "@/app/_components/_Navbar";
import { StarIconBig } from "@/app/_components/assets/StarIconBig";
import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:w-[1440px] m-auto">
      <Navbar />
      <div>
        <div>
          <p>Wicked</p>
          <div>
            <div>2024.11.26</div>·<div>PG</div>·<div>2h 40m</div>
          </div>
        </div>

        <div>
          <p>rating</p>
          <StarIconBig />
          <p>6.9/10</p>
          <p>37k</p>
        </div>
      </div>
      <div>
        <image />
        <link />
      </div>
      <Footer />
    </div>
  );
}
