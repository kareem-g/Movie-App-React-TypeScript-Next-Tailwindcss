import { Search as SearchIcon, XCircleOutline } from "heroicons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: any) => {
    if (e.target.value.length > 2) {
      setSearchTerm(e.target.value);
      setTimeout(() => {
        router.push(`/?search=${searchTerm}`);
      }, 1000);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-transparent hover:bg-gray-900 px-4 rounded-xl items-center text-center flex">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search Titles, people, genres"
          className="bg-transparent text-lg font-medium hover:bg-gray-900 w-[400px] h-[50px] px-4 py-2 rounded-xl placeholder:text-lg font-md text-white outline-none focus:bg-gray-900"
        />
        <button className="px-2.5">
          {searchTerm == "" ? (
            <SearchIcon className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
          ) : (
            <XCircleOutline onClick={() => router.push("/")} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Search;
