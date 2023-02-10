import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getMovieSearch, getPersonSearch } from "../../api/movie";
import { useNotification } from "../../hooks";
import { DEFAULT_PROFILE, TMDB_IMG_PATH } from "../../utils/config";
import Container from "../Container";
import Title from "../movie/Title";
import StdContainer from "../StdContainer";

export default function SearchResults() {
  const { updateNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [personResults, setPersonResults] = useState([]);

  const fetchResults = async () => {
    const { error: movieErr, results: movieRes } = await getMovieSearch(
      query,
      "movie",
      5
    );
    if (movieErr) return updateNotification("error", movieErr);
    setMovieResults(movieRes);
    const { error: tvErr, results: tvRes } = await getMovieSearch(
      query,
      "tv",
      5
    );
    if (tvErr) return updateNotification("error", tvErr);
    setTvResults(tvRes);
    const { error: personErr, results: personRes } = await getPersonSearch(
      query,
      5
    );
    if (personErr) return updateNotification("error", personErr);
    setPersonResults(personRes);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (query.length) fetchResults();
  }, [query]);

  return (
    <StdContainer>
      <Container className="p-10 space-y-12">
        <h1 className="text-4xl dark:text-white text-primary">{`Search "${query}"`}</h1>
        <div className="space-x-10 flex">
          {movieResults.length > 0 && (
            <SearchSection title="Movies" to="" data={movieResults} />
          )}
          {tvResults.length > 0 && (
            <SearchSection title="TV Series" to="" data={tvResults} />
          )}
          {personResults.length > 0 && (
            <SearchSection title="People" to="" data={personResults} />
          )}
        </div>
      </Container>
    </StdContainer>
  );
}

const SearchSection = ({ title, to, data }) => {
  return (
    <div className="space-y-5 w-1/4">
      <Title title={title} to={to} />
      <div className="border dark:border-tertiary border-gray rounded-md p-5 space-y-3">
        {data.map((d, index) => {
          const {
            id,
            type,
            title,
            name,
            poster_path,
            profile_path,
            release_date = null,
            known_for = null,
          } = d;
          const dest = name ? `/person/${id}` : `/movie/${id}?type=${type}`;
          const path = poster_path || profile_path;
          return (
            <div className="flex items-center space-x-3" key={index}>
              <Link className="w-1/3" to={dest}>
                <img
                  className="w-full aspect-auto object-cover drop-shadow"
                  src={path ? TMDB_IMG_PATH + path : DEFAULT_PROFILE}
                  alt=""
                />
              </Link>
              <div className="w-2/3 space-y-2 flex flex-col">
                <Link
                  className="dark:text-white text-primary font-semibold hover:opacity-80 transition"
                  to={dest}
                >
                  {title || name}
                </Link>
                <span className="dark:text-dark-subtle text-light-subtle text-sm">
                  {release_date?.substring(0, 4) || known_for}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
