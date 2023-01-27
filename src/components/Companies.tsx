import { baseUrl } from "constants/movie";
import Image from "next/legacy/image";
import React from "react";
import { Companies, Details } from "types";

export default function Companies({
  MovieDetails,
}: {
  MovieDetails: Details | undefined;
}) {
  return (
    <div className="flex justify-start gap-10 items-center px-8">
      {MovieDetails?.production_companies?.map((companies: Companies) => (
        <div key={companies.id}>
          <Image
            src={`${baseUrl}${companies.logo_path}`}
            alt=""
            className="w-36 shadow-xl"
          />
        </div>
      ))}
    </div>
  );
}
