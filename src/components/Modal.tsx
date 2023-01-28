import { Fragment, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "atoms/ModalAtoms";
import { Genre, Item, Movie, Companies, Details } from "types";
import MuiModal from "@mui/material/Modal";
import CompaniesRow from "./CompaniesRow";
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
import Image from "next/legacy/image";
import { baseUrl } from "constants/movie";

export default function Modal() {
  const [movie, setMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [open, setOpen] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [companies, setCompanies] = useState<Details[]>([]);
  const [cast, setCast] = useState<any[]>([]);

  const [addedToList, setAddedToList] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  //   const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
    toast.dismiss();
  };

  const toastStyle = {
    background: "#181818",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
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

  console.log("Cast:", cast);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
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
              muted={muted}
            />
          ) : (
            <p className="flex justify-center flex-col gap-3 items-center w-full h-full absolute top-0 left-0 bg-black uppercase">
              Trailer Not found!
              <p className="text-gray-400 break-all text-sm lowercase">
                It&apos;s possible that this movie/series is no longer available
                due to its age or the trailer has been removed by the owner.
              </p>
            </p>
          )}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center justify-center gap-x-1 rounded bg-white px-8 text-sm md:text-lg font-semibold text-black transition hover:bg-[#e6e6e6]">
                <Play className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={() => {}}>
                {addedToList ? (
                  <Check className="h-7 w-7" />
                ) : (
                  <Plus className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <ThumbUp className="h-6 w-6" />
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
            <div className="flex items-center space-x-2 text-sm">
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
                  <span className="text-[gray]">Actors:</span>{" "}
                  {cast
                    .slice(0, 4)
                    .map((cast) => cast?.name)
                    .join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
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
      </>
    </MuiModal>
  );
}
