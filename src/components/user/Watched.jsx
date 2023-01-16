/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuth, useNotification } from "../../hooks";
import Loading from "./Loading";
import WatchlistCard from "./WatchlistCard";
import MoviePoster from "../movie/MoviePoster";
import { getWatched } from "../../api/user";
import { decodeGenre } from "../../utils/helper";

export default function Watched() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const id = authInfo?.profile?.id;

  const [ready, setReady] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovieList = async () => {
    const result1 = await getWatched("movie");
    if (result1.error) return updateNotification("error", result1.error);
    const result2 = await getWatched("tv");
    if (result2.error) return updateNotification("error", result2.error);
    setReady(true);
    const arr = [];
    for (let w of result1.watched) arr.push(w);
    for (let w of result2.watched) arr.push(w);
    setMovies(arr);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) fetchMovieList();
  }, [id]);

  if (!ready) return <Loading />;

  return <div>{movies.map((m, index) => (
    <MoviePoster
      key={index}
      movie={m}
      ignoreAddWatchlist
      defaultStatus={2}
    />
  ))}</div>;
}
