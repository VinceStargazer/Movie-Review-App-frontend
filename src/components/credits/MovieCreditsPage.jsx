import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCredits, getSingleMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import MoviePageHead from "../movie/MoviePageHead";
import Container from "../Container";
import Loading from "../user/Loading";
import CrewSection from "./CrewSection";
import CastSection from "./CastSection";
import StdContainer from "../StdContainer";

export default function MovieCreditsPage() {
  const { updateNotification } = useNotification();

  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [producers, setProducers] = useState([]);
  const [sound, setSound] = useState([]);
  const [art, setArt] = useState([]);
  const [VFX, setVFX] = useState([]);
  const [editors, setEditors] = useState([]);
  const [costume, setCostume] = useState([]);
  const [camera, setCamera] = useState([]);
  const [lighting, setLighting] = useState([]);
  const [thanks, setThanks] = useState([]);
  const [others, setOthers] = useState([]);

  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId, type);
    if (error) return updateNotification("error", error);
    setMovie(movie);
  };

  const fetchMovieCredits = async () => {
    const {
      error,
      cast,
      directors,
      writers,
      producers,
      sound,
      art,
      VFX,
      editors,
      costume,
      camera,
      lighting,
      thanks,
      others,
    } = await getCredits(movieId, type);
    if (error) return updateNotification("error", error);
    setReady(true);
    setCast(cast);
    setDirectors(directors);
    setWriters(writers);
    setProducers(producers);
    setSound(sound);
    setArt(art);
    setVFX(VFX);
    setEditors(editors);
    setCostume(costume);
    setCamera(camera);
    setLighting(lighting);
    setThanks(thanks);
    setOthers(others);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId) {
      fetchMovie();
      fetchMovieCredits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (!ready) return <Loading />;

  return (
    <StdContainer>
      <Container className="p-10 space-y-5">
        <MoviePageHead movie={movie} subtitle="Full Cast & Crew" />
        <div>
          <CrewSection title="Directed by" crew={movie.directors} />
          <CrewSection title="Writing Credits" crew={writers} />
          <CastSection cast={cast} />
          {directors.length > 1 && (
            <CrewSection title="Directing Department" crew={directors} />
          )}
          <CrewSection title="Production Department" crew={producers} />
          <CrewSection title="Editing Department" crew={editors} />
          <CrewSection title="Art Department" crew={art} />
          <CrewSection title="Sound Department" crew={sound} />
          <CrewSection title="Costume & Makeup" crew={costume} />
          <CrewSection title="Visual Effects by" crew={VFX} />
          <CrewSection title="Camera Department" crew={camera} />
          <CrewSection title="Lighting Department" crew={lighting} />
          <CrewSection title="Other Crew" crew={others} />
          <CrewSection title="Thanks" crew={thanks} />
        </div>
      </Container>
    </StdContainer>
  );
}
