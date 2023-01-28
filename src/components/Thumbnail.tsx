import { modalState, movieState } from "atoms/ModalAtoms";
import Image from "next/legacy/image";
import React from "react";
import { useRecoilState } from "recoil";
import { Movie } from "types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PlusCircle } from "heroicons-react";

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

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

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
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        // onClick={handleChangePage}
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
          // handleChangePage
        }}
        className={
          isDetails
            ? `relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-[200px] md:min-w-[350px] md:hover:scale-105`
            : `relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`
        }
      >
        {movie.backdrop_path || movie.poster_path ? (
          <div
            className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
          >
            {/* <div
              style={{
                background: `linear-gradient(to top, rgb(6, 6, 6) 15%, transparent 100%), url(${baseUrl}${
                  movie?.backdrop_path || movie?.poster_path
                })`,
                backgroundSize: "cover",
                backgroundPosition: "50%",
              }}
            > */}

            {/* <div className="flex items-end h-full">
              <button
                className="p-3 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTrailer;
                }}
              >
                <PlayOutline />
                <span>Add to My List</span>
              </button>
            </div> */}

            <div className="absolute left-0 top-0 right-0 bottom-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  movie.backdrop_path || movie.poster_path
                }`}
                layout="fill"
                className="rounded-sm object-cover md:rounded"
                alt={movie.name}
              />
              <div className="transition-all duration-200 ease-out absolute top-0 bottom-0 right-0 left-0 hover:bg-gradient-to-t from-black to-transparent h-full flex items-end">
                <button
                  className="p-2 z-10 flex flex-row gap-1 items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrailer;
                  }}
                >
                  <PlusCircle />
                  <span className="text-sm">Add to My List</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // </div>
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
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
      </motion.div>
    </>
  );
};
