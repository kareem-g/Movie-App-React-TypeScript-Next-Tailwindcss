import { Header } from "@/components/Header";
import { Row } from "@/components/Row";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();

  const { slug } = router.query;

  const fetchData = async () => {
    const movieSearchdata = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.NEXT_PUBLIC_TMDB_API_KEY
      }&language=en-US&query=${slug && slug[0]}&page=1&include_adult=true`
    ).then((res) => res.json());
    setData(movieSearchdata.results);
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  console.log(slug);
  return (
    <div>
      <Header />
      <Row
        title="Search"
        movies={data}
        isDetails={false}
        type="movie"
        isSearch={true}
      />
    </div>
  );
}
