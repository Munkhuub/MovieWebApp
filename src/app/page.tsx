"use client";

import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { UpComing } from "./_components/UpComing";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";
import { Footer } from "./_components/Footer";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const handleToggleDark = () => setIsDark(!isDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="w-full overflow-x-hidden bg-background text-foreground">
        <div className="max-w-[1440px] w-full mx-auto relative">
          <Navbar isDark={isDark} onToggleDark={handleToggleDark} />

          <main>
            <Hero />
            <section className="px-4 lg:px-8 py-10">
              <UpComing />
              <Popular />
              <TopRated />
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
