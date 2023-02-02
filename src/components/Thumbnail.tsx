import Image from "next/legacy/image";
import React, { Suspense, useEffect } from "react";
import { Movie } from "types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Check, Plus } from "heroicons-react";
import { Tooltip } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import ThumbnailSkeleton from "./ThumbnailSkeleton";

export const Thumbnail = ({
  movie,
  isDetails,
  type,
  isfavourite,
  onPlayTrailer,
}: {
  movie: Movie;
  isDetails: Boolean;
  type: string;
  isfavourite?: boolean;
  onPlayTrailer?: () => void;
}) => {
  const router = useRouter();

  const setCurrentMovie = useStoreActions(
    (actions: any) => actions.setCurrentMovie
  );
  const setModalOpen = useStoreActions((actions: any) => actions.setModalOpen);

  const handleModalOpen = (movie: any) => {
    setModalOpen(true);
    setCurrentMovie(movie);
  };

  const myListIds = useStoreState((state: any) => state.myListIds);
  const addToMyList = useStoreActions((actions: any) => actions.addToMyList);
  const removeFromMyList = useStoreActions(
    (actions: any) => actions.removeFromMyList
  );

  const toggleMyList = () => {
    if (myListIds.includes(movie?.id)) {
      removeFromMyList(movie?.id);
    } else {
      addToMyList(movie);
    }
  };

  const handleChangePage = () => {
    if (isfavourite) {
      router.push({
        pathname: isDetails
          ? `${process.env.NEXT_PUBLIC_AUTH_URL}/details/${movie.id}`
          : `details/${movie.id}`,
        query: {
          movieId: movie.id.toString(),
          type: movie?.title ? "movie" : "tv",
        },
      });
    } else {
      router.push({
        pathname: isDetails
          ? `${process.env.NEXT_PUBLIC_AUTH_URL}/details/${movie.id}`
          : `details/${movie.id}`,
        query: {
          movieId: movie.id.toString(),
          type: movie.media_type?.toString()
            ? movie.media_type?.toString()
            : type.toString(),
        },
      });
    }
  };

  return (
    <Suspense>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        onClick={() => {
          handleModalOpen(movie);
        }}
      >
        <div className="absolute left-0 top-0 right-0 bottom-0">
          {movie.backdrop_path || movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              layout="fill"
              className="rounded-sm object-cover md:rounded"
              alt={movie.name}
            />
          ) : (
            <div
              role="status"
              className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] animate-pulse flex items-center"
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
          )}
          <div className="transition-all duration-200 ease-out absolute top-0 bottom-0 right-0 left-0 hover:bg-gradient-to-t from-black to-transparent h-full flex items-end">
            <div className="text-center text-white opacity-0 hover:opacity-100">
              <div className="z-10 absolute bottom-0 top-0 left-0 right-0 flex items-end justify-between p-2">
                <button
                  className="thumbnailButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMyList();
                    onPlayTrailer;
                  }}
                >
                  {myListIds.includes(movie?.id) ? (
                    <Tooltip title="Remove From My List" placement="bottom">
                      <Check className="h-5 w-5" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add To My List" placement="bottom">
                      <Plus className="h-6 w-6" />
                    </Tooltip>
                  )}
                </button>

                <button
                  className="thumbnailButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrailer;
                  }}
                >
                  <Tooltip title="Play" placement="bottom">
                    {/* <Play className="h-6 w-6" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                  </Tooltip>
                </button>
              </div>
              <div className="absolute bottom-0 top-0 left-0 right-0 flex items-center justify-center p-2">
                <p className="text-xs font-black">
                  {movie?.title || movie?.original_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
};
