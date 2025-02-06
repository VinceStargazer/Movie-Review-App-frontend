import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Loading from "./Loading";
import { getWatched } from "../../api/user";
import StdContainer from "../StdContainer";
import MovieStore from "../MovieStore";
import Container from "../Container";
import Trending from "../movie/Trending";

export default function Watched() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const navigate = useNavigate();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!authInfo.isLoggedIn) navigate('/');
  }, [authInfo.isLoggedIn, navigate]);

  if (!ready) return <Loading />;

  if (!movies.length)
    return (
      <StdContainer>
        <Container className="p-10 space-y-10">
          <h1 className="text-2xl dark:text-white text-primary font-semibold">
            You don't have any reviews yet. Here's something to start...
          </h1>
          <Trending type="movie" />
          <Trending type="tv" />
        </Container>
      </StdContainer>
    );

  return (
    <StdContainer>
      <MovieStore movies={movies} title="Your Ratings" defaultStatus={2} />
    </StdContainer>
  );
}
