import React, { useEffect, useState } from "react";
import { getSimilarMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import Title from "./Title";
import MoviePoster from "./MoviePoster";

export default function SimilarMovies({ movieId, type }) {
  const { updateNotification } = useNotification();

  const [movies, setMovies] = useState([]);

  const fetchSimilarMovies = async () => {
    const { error, movies } = await getSimilarMovies(movieId, type);
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    if (movieId) fetchSimilarMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <Container className="p-10 space-y-5">
      <Title title="More like this" />
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-9">
        {movies.map((m, index) => (
          <MoviePoster key={index} movie={m} />
        ))}
      </div>
    </Container>
  );
}
