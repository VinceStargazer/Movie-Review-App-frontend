/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import GridContainer from "../GridContainer";
import MovieCard from "./MovieCard";

export default function Trending({ type }) {
  const [ready, setReady] = useState(false);
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTrendingMovies(type);
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
    setReady(true);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!ready) return null;

  return (
    <div>
      <h1 className="text-2xl dark:text-zinc text-secondary font-semibold mb-5 dark:hover:text-highlight-dark hover:text-highlight-deep transition cursor-pointer">
        {`Trending ${type === "movie" ? "Movies" : "TVs"}`}
      </h1>
      <GridContainer>
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </GridContainer>
    </div>
  );
}
