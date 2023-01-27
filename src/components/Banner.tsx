import { baseUrl } from "constants/movie";
import { InformationCircleOutline, Play } from "heroicons-react";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { Movie } from "types";

export default function Banner({
  netflixOriginals,
}: {
  netflixOriginals: Movie[];
}) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 xl:pb-7 2xl:pb-4">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full bg-gradient-to-t from-black to-transparent">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          className="mix-blend-overlay"
          objectFit="cover"
          alt={`${movie?.title || movie?.name || movie?.original_name}`}
          priority
        />
      </div>

      <h1 className="text-2xl font-bold 2xl:w-full md:text-2xl lg:text-5xl">
        {movie?.title || movie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-shadow-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button
          className="text-black bg-white bannerButton"
          onClick={() => {
            // setCurrentMovie(movie)
            // setShowModal(true)
          }}
        >
          <Play className="w-4 h-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          onClick={() => {
            console.log("More Info clicked: ", movie?.title);
            // setCurrentMovie(movie)
            // setShowModal(true)
          }}
          className="bannerButton bg-[gray]/50"
        >
          <InformationCircleOutline className="w-5 h-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
}
