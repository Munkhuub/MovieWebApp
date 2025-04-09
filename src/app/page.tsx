"use client";
import Image from "next/image";
import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { UpComing } from "./_components/UpComing";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <div className="lg:w-[1440px] m-auto relative">
      <Navbar />
      <Hero />
      <UpComing />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
