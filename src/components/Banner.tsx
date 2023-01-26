import { baseUrl } from "constants/movie";
import { InformationCircle, Play } from "heroicons-react";
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
    <div
      className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 items-start"
      style={{
        background: `linear-gradient(to right, rgb(6, 6, 6) 15%, transparent 100%), url(https://image.tmdb.org/t/p/original//${movie?.backdrop_path}) `,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      }}
    >
      {/* <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div> */}

      <h1 className="text-2xl lg:text-4xl font-black w-1/2 lg:w-full">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      {/* <div className="flex flex-col w-full lg:w-2/5	z-50 justify-center relative items-start "> */}
      <span className="max-w-xs md:max-w-lg px-2 bg-neutral-900 font-semibold rounded-sm outline outline-1 outline-neutral-500">
        {movie?.first_air_date?.split("-")[0] ||
          movie?.release_date?.split("-")[0]}
      </span>
      {/* </div> */}

      <p className="max-w-xs text-stone-400  text-shadow-md md:max-w-lg lg:max-w-2xl text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <Play className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>

        <button
          className="bannerButton bg-gray-900/50"
          onClick={() => {
            console.log(movie);
            // setCurrentMovie(movie)
            // setShowModal(true)
          }}
        >
          <InformationCircle className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
}
