/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getMovieImages, getSingleMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import MoviePageHead from "../movie/MoviePageHead";
import StdContainer from "../StdContainer";
import Loading from "../user/Loading";
import GallerySection from "./GallerySection";

export default function MovieImagesPage() {
  const { updateNotification } = useNotification();

  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const [backdrops, setBackdrops] = useState([]);
  const [logos, setLogos] = useState([]);
  const [posters, setPosters] = useState([]);

  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId, type);
    if (error) return updateNotification("error", error);
    setMovie(movie);
  };

  const fetchImages = async () => {
    const { error, backdrops, logos, posters } = await getMovieImages(
      movieId,
      type
    );
    if (error) return updateNotification("error", error);
    setReady(true);
    setBackdrops(backdrops);
    setLogos(logos);
    setPosters(posters);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId) {
      fetchMovie();
      fetchImages();
    }
  }, [movieId]);

  if (!ready) return <Loading />;

  return (
    <StdContainer>
      <Container className="p-10 space-y-5">
        <MoviePageHead movie={movie} subtitle="Photo Gallery" />

        <GallerySection images={backdrops} type="Backdrops" />
        <GallerySection images={logos} type="Logos" />
        <GallerySection images={posters} type="Posters" imgPerPage={15} />
      </Container>
    </StdContainer>
  );
}
