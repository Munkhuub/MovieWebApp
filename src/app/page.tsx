"use client";
import Image from "next/image";
import { Navbar } from "./_components/_Navbar";
import { Hero } from "./_components/_Hero";
import { UpComing } from "./_components/_UpComing";
import { Popular } from "./_components/_Popular";
import { TopRated } from "./_components/_TopRated";
import { Footer } from "./_components/_Footer";

export default function Home() {
  return (
    <div className="lg:w-[1440px] m-auto">
      <Navbar />
      <Hero />
      <UpComing />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
