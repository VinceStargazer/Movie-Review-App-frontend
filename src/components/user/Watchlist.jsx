/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getWatchlist } from "../../api/user";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import StdContainer from "../StdContainer";
import Loading from "./Loading";
import Trending from "../movie/Trending";
import MovieStore from "../MovieStore";

export default function Watchlist() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const id = authInfo?.profile?.id;

  const [ready, setReady] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovieList = async () => {
    const result1 = await getWatchlist("movie");
    if (result1.error) return updateNotification("error", result1.error);
    const result2 = await getWatchlist("tv");
    if (result2.error) return updateNotification("error", result2.error);
    setReady(true);
    const arr = [];
    for (let w of result1.watchlist) arr.push(w);
    for (let w of result2.watchlist) arr.push(w);
    setMovies([...arr]);
  };

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
      <MovieStore movies={movies} title="Your Watchlist" defaultStatus={1} />
    </StdContainer>
  );
}
