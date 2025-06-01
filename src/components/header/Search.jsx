import React, { useContext } from "react";
import SearchIcon from "../../assets/search.svg";
import { LocationContext } from "../../context";
import { useDebounce } from "../../hooks";

export default function Search() {
  const { setSelectedLocation, error, setError } = useContext(LocationContext);

  const doSearch = useDebounce((term) => {
    setSelectedLocation(term);
  }, 1000);

  const handleChange = (e) => {
    const value = e.target.value;
    doSearch(value);

    if (error) setError("");
  };

  return (
    <>
      <form>
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
            <input
              className="bg-transparent placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
              type="search"
              placeholder="Search Location"
              onChange={handleChange}
              required
            />
            <button type="submit">
              <img src={SearchIcon} alt="search" />
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-1 ml-1">{error}</p>}
        </div>
      </form>
    </>
  );
}
