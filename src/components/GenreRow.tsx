import React from "react";
import { Movie } from "types";

export const GenreRow = ({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) => {
  return <div>{title}</div>;
};
