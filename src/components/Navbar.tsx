"use client";

import React from "react";

import Link from "next/link";
// import Image from "next/image";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
// import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="h-fit w-full">
      <nav
        className={cn(
          "z-50",
          "flex h-[3.5rem] px-4",
          "w-full items-center border-b bg-accent/20"
        )}
      >
        <div className="hidden select-none text-xl font-extrabold uppercase md:block">
          Any Video Downloader
        </div>
        <MobileNav className="md:hidden" />
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden items-center gap-4 text-lg sm:gap-8 sm:pr-8 md:flex">
            <Link href="/" className="hover:underline">
              Instagram Video Downloader
            </Link>
          </div>
          <div className="hidden items-center gap-4 text-lg sm:gap-8 sm:pr-8 md:flex">
            <Link href="/youtube" className="hover:underline">
              YouTube Video Downloader
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
