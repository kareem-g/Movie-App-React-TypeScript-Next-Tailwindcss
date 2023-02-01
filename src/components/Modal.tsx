import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Genre, Item, Details } from "types";
import MuiModal from "@mui/material/Modal";
import {
  Check,
  Play,
  Plus,
  ThumbUp,
  ThumbUpOutline,
  VolumeOff,
  VolumeUp,
  XCircleOutline,
} from "heroicons-react";
import ReactPlayer from "react-player";
import { Tooltip, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import Image from "next/legacy/image";

export default function Modal() {
  const [movie, setMovie] = useState(
    useStoreState((state: any) => state.currentMovie)
  );

  const setModalOpen = useStoreActions((actions: any) => actions.setModalOpen);

  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [companies, setCompanies] = useState<Details[]>([]);
  const [cast, setCast] = useState<any[]>([]);

  const favouritesIds = useStoreState((state: any) => state.favouritesIds);
  const myListIds = useStoreState((state: any) => state.myListIds);

  const deleteFavorite = useStoreActions(
    (actions: any) => actions.deleteFavorite
  );
  const addFavourites = useStoreActions(
    (actions: any) => actions.addFavourites
  );

  const addToMyList = useStoreActions((actions: any) => actions.addToMyList);
  const removeFromMyList = useStoreActions(
    (actions: any) => actions.removeFromMyList
  );

  const toggleMyList = () => {
    if (myListIds.includes(movie?.id)) {
      removeFromMyList(movie?.id);
      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    } else {
      addToMyList(movie);
      toast(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    }
  };

  const toggleFavourite = () => {
    if (favouritesIds.includes(movie?.id)) {
      deleteFavorite(movie?.id);
    } else {
      addFavourites(movie);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setMovie(null);
    toast.dismiss();
  };

  const toastStyle = {
    background: "#181818",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const cast = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}/credits?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (cast) {
        setCast(cast?.cast);
      }

      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Item) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }

      if (data?.production_companies) {
        setCompanies(data.production_companies);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      open={setModalOpen(true)}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Toaster position="bottom-center" />
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XCircleOutline className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              loop
              muted={muted}
            />
          ) : (
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent">
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  movie.backdrop_path || movie.poster_path
                }`}
                layout="fill"
                className="rounded-sm object-cover md:rounded blur-lg"
                alt={movie.name}
              />
              <p className="flex justify-center flex-col gap-3 items-center w-full h-full absolute top-0 left-0 bg-black/50 uppercase text-xs md:text-sm text-shadow-xl">
                Trailer Not found!
                <p className="text-gray-400 break-words lowercase text-center">
                  It&apos;s possible that this movie/series is no longer{" "}
                  available due to its age or the trailer has been removed by
                  the owner.
                </p>
              </p>
            </div>
          )}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center justify-center gap-x-1 rounded bg-white px-8 text-sm md:text-lg font-semibold text-black transition hover:bg-[#e6e6e6]">
                <Play className="h-7 w-7 text-black" />
                Play
              </button>
              <button
                className="modalButton"
                onClick={() => {
                  toggleMyList();
                }}
              >
                {myListIds.includes(movie?.id) ? (
                  <Check className="h-7 w-7" />
                ) : (
                  <Plus className="h-7 w-7" />
                )}
              </button>
              <button
                className="modalButton"
                onClick={() => {
                  toggleFavourite();
                }}
              >
                {favouritesIds.includes(movie?.id) ? (
                  <ThumbUp className="h-6 w-6" />
                ) : (
                  <ThumbUpOutline className="h-6 w-6" />
                )}
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOff className="h-6 w-6" />
              ) : (
                <VolumeUp className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <h1 className="text-sm font-bold 2xl:w-full md:text-2xl">
              {movie?.title || movie?.original_name}
            </h1>
            <div className="flex flex-row items-center space-x-2 text-sm">
              {movie?.vote_average ? (
                <p className="font-semibold text-green-400">
                  {Math.ceil(movie!.vote_average * 10)}% Match
                </p>
              ) : (
                <p className="font-semibold text-red-400">
                  Vote Average Not Found
                </p>
              )}
              <p className="font-medium">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>

              <Tooltip
                title={
                  <Typography className="text-lg">
                    Subtitles for the deaf and hard of hearing are available for
                    some episodes
                  </Typography>
                }
                placement="top"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Hawkins-Icon Hawkins-Icon-Small"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 1.75C0 1.33579 0.335786 1 0.75 1H15.25C15.6642 1 16 1.33579 16 1.75V11.25C16 11.6642 15.6642 12 15.25 12H12.75V14C12.75 14.2652 12.61 14.5106 12.3817 14.6456C12.1535 14.7806 11.8709 14.785 11.6386 14.6572L6.80736 12H0.75C0.335786 12 0 11.6642 0 11.25V1.75ZM1.5 2.5V10.5H7H7.19264L7.36144 10.5928L11.25 12.7315V11.25V10.5H12H14.5V2.5H1.5ZM6 5.75L3 5.75V4.25L6 4.25V5.75ZM13 7.25H10V8.75H13V7.25ZM8 8.75L3 8.75V7.25L8 7.25V8.75ZM13 4.25H8V5.75H13V4.25Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
              {movie?.overview ? (
                <p className="w-5/6 font-medium text-sm md:text-base">
                  {movie?.overview}
                </p>
              ) : (
                <p className="w-5/6 font-medium text-sm md:text-base">
                  Overview Not Found.
                </p>
              )}
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  {cast ? (
                    <>
                      <span className="text-[gray]">Cast:</span>{" "}
                      {cast
                        .slice(0, 4)
                        .map((cast) => cast?.name)
                        .join(", ")}
                    </>
                  ) : null}
                </div>

                <div>
                  {cast ? (
                    <>
                      <span className="text-[gray]">Genres:</span>{" "}
                      {genres.map((genre) => genre.name).join(", ")}
                    </>
                  ) : null}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </MuiModal>
  );
}
