"use client";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { UpComing } from "./components/UpComing";
import { Popular } from "./components/Popular";
import { TopRated } from "./components/TopRated";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="lg:w-[1440px] m-auto">
      <Navbar />
      <Hero />
      {/* <UpComing />
      <Popular />
      <TopRated />
      <Footer />  */}
    </div>
  );
}
