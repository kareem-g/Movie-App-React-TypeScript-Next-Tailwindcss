import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { BellOutline, Search } from "heroicons-react";
import Link from "next/link";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, [setIsScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`${isScrolled && "bg-[#141414]/30 backdrop-blur-md"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          width={100}
          height={100}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="netflix"
        />

        <ul className="hidden space-x-4 md:flex">
          <li>
            <a href="/browse" className="headerLink">
              Home
            </a>
          </li>
          <li>
            <a href="/shows" className="headerLink">
              TV Shows
            </a>
          </li>
          <li>
            <a href="/latest" className="headerLink">
              New & Popular
            </a>
          </li>
          <li>
            <a href="/movies" className="headerLink">
              Movies
            </a>
          </li>
          <li>
            <a href="/MyList" className="headerLink">
              My List
            </a>
          </li>
        </ul>
      </div>

      {/* Search, Notification bell and profile picture */}
      <div className="flex items-center space-x-4 text-sm">
        <Search className="hidden h-6 w-6 sm:inline" />
        <p className="hidden uppercase lg:inline">DVD</p>
        <BellOutline className="h-6 w-6" />
        <Link href="/YourAccount">
          <Image
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt="Your Account"
            className="cursor-pointer rounded"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </header>
  );
};
