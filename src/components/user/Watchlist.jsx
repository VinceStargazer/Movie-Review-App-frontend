/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import {
  BsFillArrowRightSquareFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { getWatchlist } from "../../api/user";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import StdContainer from "../StdContainer";
import DropDownBtns from "./DropDownBtns";
import Loading from "./Loading";
import { decodeGenre } from "../../utils/helper";
import WatchlistCard from "./WatchlistCard";
import MoviePoster from "../movie/MoviePoster";
import Trending from "../movie/Trending";

const btnClass = "rounded transition dark:hover:bg-tertiary hover:bg-zinc ";
const containerClass =
  "dark:bg-secondary bg-zinc border-b dark:border-fourth border-light-fourth px-3 ";
const inputClass =
  "px-2 py-1 rounded outline outline-1 outline-light-fourth dark:outline-fourth dark:bg-primary bg-white focus:dark:outline-light-fourth focus:outline-fourth transition dark:text-gray text-tertiary w-36";

export default function Watchlist() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const id = authInfo?.profile?.id;

  const [ready, setReady] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isDescend, setIsDescend] = useState(true);
  const [isGrid, setIsGrid] = useState(false);
  const [showRefine, setShowRefine] = useState(false);
  const [selectedOption, setSelectedOption] = useState("type");
  const [selectedOrder, setSelectedOrder] = useState("List Order");
  const [typeOptions, setTypeOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [fromYear, setFromYear] = useState(0);
  const [toYear, setToYear] = useState(0);

  const fetchMovieList = async () => {
    const result1 = await getWatchlist("movie");
    if (result1.error) return updateNotification("error", result1.error);
    const result2 = await getWatchlist("tv");
    if (result2.error) return updateNotification("error", result2.error);
    setReady(true);
    const arr = [],
      types = [],
      genres = [];
    let min = 2300,
      max = 0;
    const genreMap = new Map();
    for (let w of result1.watchlist) {
      const { releaseDate, genres } = w;
      const year = parseInt(releaseDate?.substring(0, 4));
      min = Math.min(min, year);
      max = Math.max(max, year);
      for (let g of genres) {
        g = decodeGenre(g);
        if (genreMap.has(g)) genreMap.set(g, genreMap.get(g) + 1);
        else genreMap.set(g, 1);
      }
      arr.push(w);
    }
    for (let w of result2.watchlist) {
      const { releaseDate, genres } = w;
      const year = parseInt(releaseDate?.substring(0, 4));
      min = Math.min(min, year);
      max = Math.max(max, year);
      for (let g of genres) {
        g = decodeGenre(g);
        if (genreMap.has(g)) genreMap.set(g, genreMap.get(g) + 1);
        else genreMap.set(g, 1);
      }
      arr.push(w);
    }
    types.push(
      <CheckOption title="Movie" number={result1.watchlist?.length} />
    );
    types.push(
      <CheckOption title="TV Series" number={result2.watchlist?.length} />
    );
    genreMap.forEach((value, key) => {
      genres.push(<CheckOption title={key} number={value} />);
    });
    setMovies([...arr]);
    setMoviesToShow(arr);
    setTypeOptions(types);
    setGenreOptions(genres);
    setFromYear(min);
    setToYear(max);
  };

  const handleListOrder = () => {
    if (selectedOrder === "List Order") return;
    setMoviesToShow([...movies]);
    setSelectedOrder("List Order");
    setIsDescend(true);
  };

  const handleAlphabetical = () => {
    if (selectedOrder === "Alphabetical") return;
    const arr = [...moviesToShow];
    arr.sort((a, b) => a.title.localeCompare(b.title));
    setMoviesToShow(arr);
    setSelectedOrder("Alphabetical");
    setIsDescend(false);
  };

  const handleRatingOrder = () => {
    if (selectedOrder === "Rating") return;
    const arr = [...moviesToShow];
    arr.sort((a, b) => {
      const score1 = b.reviews?.reviewCount ? b.reviews.ratingSum / b.reviews.reviewCount : 0,
        score2 = a.reviews?.reviewCount ? a.reviews.ratingSum / a.reviews.reviewCount : 0;
      if (score1 === score2) return 0;
      return score1 > score2 ? 1 : -1;
    });
    setMoviesToShow(arr);
    setSelectedOrder("Rating");
    setIsDescend(true);
  };

  const handleRatingNumOrder = () => {
    if (selectedOrder === "Number of Ratings") return;
    const arr = [...moviesToShow];
    arr.sort((a, b) => b.reviews?.reviewCount - a.reviews?.reviewCount);
    setMoviesToShow(arr);
    setSelectedOrder("Number of Ratings");
    setIsDescend(true);
  };

  const handleDateOrder = () => {
    if (selectedOrder === "Release Date") return;
    const arr = [...moviesToShow];
    arr.sort((a, b) => b.releaseDate?.localeCompare(a.releaseDate));
    setMoviesToShow(arr);
    setSelectedOrder("Release Date");
    setIsDescend(true);
  };

  const handleRuntimeOrder = () => {
    if (selectedOrder === "Runtime") return;
    const arr = [...moviesToShow];
    arr.sort((a, b) => (b.runtime || 0) - (a.runtime || 0));
    setMoviesToShow(arr);
    setSelectedOrder("Runtime");
    setIsDescend(true);
  }

  const handleReverse = () => {
    const arr = [...moviesToShow];
    arr.reverse();
    setMoviesToShow(arr);
    setIsDescend(!isDescend);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) fetchMovieList();
  }, [id]);

  if (!ready) return <Loading />;

  if (!movies.length)
    return (
      <StdContainer>
        <Container className="p-10 space-y-10">
          <h1 className="text-2xl dark:text-white text-primary font-semibold">
            Your watchlist is empty. Here's something to start...
          </h1>
          <Trending type="movie" />
          <Trending type="tv" />
        </Container>
      </StdContainer>
    );

  return (
    <StdContainer>
      <Container className="p-10">
        <h1
          className={
            containerClass + "text-2xl dark:text-white text-primary py-5"
          }
        >
          Your Watchlist
        </h1>

        <div
          className={
            containerClass +
            "flex items-center justify-between dark:text-light-fourth text-fourth py-2"
          }
        >
          <span>{movies.length + " Titles"}</span>
          <div className="flex space-x-2 items-center">
            <span>Sort by:</span>
            <DropDownBtns selected={selectedOrder}>
              <OptionButton onClick={handleListOrder}>List Order</OptionButton>
              <OptionButton onClick={handleAlphabetical}>
                Alphabetical
              </OptionButton>
              <OptionButton onClick={handleRatingOrder}>Rating</OptionButton>
              <OptionButton onClick={handleRatingNumOrder}>
                Number of Ratings
              </OptionButton>
              <OptionButton onClick={handleDateOrder}>
                Release Date
              </OptionButton>
              <OptionButton onClick={handleRuntimeOrder}>Runtime</OptionButton>
            </DropDownBtns>

            <div className="flex items-center space-x-5">
              <button
                type="button"
                title={isDescend ? "Descending Order" : "Ascending Order"}
                className={btnClass + "flex items-center -space-x-3 py-1"}
                onClick={handleReverse}
              >
                <HiOutlineArrowNarrowDown
                  size={24}
                  className={
                    isDescend
                      ? ""
                      : "dark:text-fourth text-light-fourth transition"
                  }
                />
                <HiOutlineArrowNarrowUp
                  size={24}
                  className={
                    isDescend
                      ? "dark:text-fourth text-light-fourth transition"
                      : ""
                  }
                />
              </button>

              <button
                type="button"
                title={!isGrid ? "Grid View" : "List View"}
                className={btnClass + "p-1"}
                onClick={() => setIsGrid(!isGrid)}
              >
                {!isGrid ? (
                  <BsFillGrid3X3GapFill size={24} />
                ) : (
                  <FaThList size={24} />
                )}
              </button>

              <button
                onClick={() => setShowRefine(!showRefine)}
                className={
                  (showRefine ? "dark:bg-primary bg-white" : "") +
                  " rounded px-3 py-1 outline outline-1 text-sm dark:outline-fourth outline-light-fourth hover:dark:outline-dark-subtle hover:outline-light-subtle transition dark:hover:bg-primary hover:bg-white"
                }
              >
                REFINE
              </button>
            </div>
          </div>
        </div>

        {showRefine && (
          <div className={containerClass + "flex flex-row py-2 items-stretch"}>
            <div className="flex grow flex-col w-1/3 space-y-1 h-full">
              <RefineButton
                title="Type (Film, TV)"
                subtitle="All"
                selected={selectedOption === "type"}
                onClick={() => setSelectedOption("type")}
              />
              <RefineButton
                title="Genres"
                subtitle="All"
                selected={selectedOption === "genre"}
                onClick={() => setSelectedOption("genre")}
              />
              <RefineButton
                title="Release Year"
                subtitle="All"
                selected={selectedOption === "releaseDate"}
                onClick={() => setSelectedOption("releaseDate")}
              />
            </div>
            {selectedOption === "type" && (
              <RefineSection>{typeOptions}</RefineSection>
            )}
            {selectedOption === "genre" && (
              <RefineSection>{genreOptions}</RefineSection>
            )}
            {selectedOption === "releaseDate" && (
              <RefineSection className="p-6 space-y-3">
                <h1 className="dark:text-light-fourth text-fourth">
                  Release Year or Range
                </h1>
                <div className="flex space-x-2 items-center">
                  <input
                    type="number"
                    value={fromYear}
                    onChange={({ target }) => setFromYear(target.value)}
                    className={inputClass}
                  />
                  <span className="dark:text-light-fourth text-fourth">to</span>
                  <input
                    type="number"
                    value={toYear}
                    onChange={({ target }) => setToYear(target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    title="Search"
                    className="drop-shadow px-2 dark:text-highlight-dark text-highlight-deep"
                  >
                    <BsFillArrowRightSquareFill size={32} />
                  </button>
                </div>
              </RefineSection>
            )}
          </div>
        )}

        {!isGrid && (
          <div>
            {moviesToShow.map((m, index) => (
              <WatchlistCard key={index} movie={m} />
            ))}
          </div>
        )}

        {isGrid && (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-9 px-2 py-4">
            {moviesToShow.map((m, index) => {
              return (
                <MoviePoster
                  key={index}
                  movie={m}
                  ignoreAddWatchlist
                  defaultStatus={1}
                />
              );
            })}
          </div>
        )}
      </Container>
    </StdContainer>
  );
}

const OptionButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="text-left px-2 dark:hover:bg-light-blue hover:bg-dark-blue hover:text-white transition "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const RefineButton = ({ title, subtitle, selected, onClick }) => {
  return (
    <button
      type="button"
      className={
        (selected
          ? "dark:bg-primary bg-white"
          : "hover:dark:bg-primary hover:bg-white transition") +
        " flex flex-col text-left rounded-l px-2 py-1"
      }
      onClick={onClick}
    >
      <h1 className="dark:text-zinc text-secondary">{title}</h1>
      <h2 className="text-sm dark:text-dark-subtle text-light-subtle">
        {subtitle}
      </h2>
    </button>
  );
};

const RefineSection = ({ children, className }) => {
  return (
    <div className="flex w-2/3 dark:bg-primary bg-white rounded-r">
      <div className={className + " w-full p-2 h-full"}>{children}</div>
    </div>
  );
};

const CheckOption = ({ title, number, onCheck }) => {
  return (
    <div className="p-2 flex items-center justify-between border-b dark:border-fourth border-light-fourth dark:text-light-fourth text-fourth">
      <div className="flex items-center space-x-3">
        <input type="checkbox" onChange={onCheck} />
        <h1 className="">{title}</h1>
      </div>
      <div className="">{number}</div>
    </div>
  );
};
