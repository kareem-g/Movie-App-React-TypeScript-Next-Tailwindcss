import { ChevronLeft, ChevronRight } from "heroicons-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Movie } from "types";
import { Thumbnail } from "./Thumbnail";
import ThumbnailSkeleton from "./ThumbnailSkeleton";

export const Row = ({
  type,
  title,
  movies,
  isDetails,
  isSearch,
  isfavourite,
  likeMovies,
}: {
  type: string;
  title: string;
  movies: Movie[];
  isDetails: boolean;
  isSearch?: boolean;
  isfavourite?: boolean;
  likeMovies?: any;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-auto cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white hover:text-shadow-md md:text-xl lg:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className={
            // isSearch && movies!.length >= 4
            isSearch
              ? `grid overflow-hidden items-center gap-3 m-auto pr-16 pt-5`
              : `flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2`
          }
        >
          {movies ? (
            <>
              {movies.map((movie) => (
                <Thumbnail
                  isDetails={isDetails}
                  key={movie.id}
                  movie={movie}
                  type={type}
                />
              ))}
            </>
          ) : (
            <ThumbnailSkeleton />
          )}
        </div>
        {!isSearch && (
          <ChevronRight
            className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick("right")}
          />
        )}
      </div>
    </div>
  );
};
