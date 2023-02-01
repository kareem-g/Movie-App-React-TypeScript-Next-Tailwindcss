import { SearchCircle } from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Search() {
  const [val, setVal] = useState<any>("");
  const router = useRouter();

  const handleChange = (e: any) => {
    if (e.target.value) {
      setVal(e.target.value);
      router.push(`/?search=${val}`);
    } else if (e.target.value.length < 1) {
      router.push("/");
    }
  };

  const handleClick = () => {
    var SearchBar: any = document.getElementById("search");
    var SearchInput: any = document.getElementById("searchinput");
    SearchInput.focus();
    SearchInput.style.maxWidth = "800px";
    SearchInput.style.marginLeft = "0.7rem";
    SearchBar.style.width = "auto";
  };

  return (
    <div className="cursor-pointer right-0">
      <div
        className={` text-white h-10 w-10  rounded-full flex items-center p-2.5 shadow-2xl relative right-0`}
        id="search"
        onClick={handleClick}
      >
        <SearchCircle size={24} strokeWidth={2} />
        <input
          type="text"
          autoComplete={"off"}
          onChange={handleChange}
          className={`text-white bg-transparent border-none outline-none max-w-0 ease-in-out transition-all duration-700`}
          placeholder="Search for Movies,Series..."
          id="searchinput"
        />
      </div>
    </div>
  );
}

export default Search;
