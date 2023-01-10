import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
} from "react-icons/ai";

import { getNowPlaying, getPopularPersons } from "../../api/movie";
import { useNotification } from "../../hooks";
import { Link } from "react-router-dom";
import MovieSlide from "./MovieSlide";
import PersonSlide from "./PersonSlide";

export default function SlideShow() {
  const { updateNotification } = useNotification();

  const [movies, setMovies] = useState([]);
  const [persons, setPersons] = useState([]);
  const [sliderPaused, setSliderPaused] = useState(false);

  const sliderRef = useRef();
  const personSlider = useRef();

  const fetchPlaying = async () => {
    const { movies, error } = await getNowPlaying();
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  const fetchPersons = async () => {
    const { persons, error } = await getPopularPersons();
    if (error) return updateNotification("error", error);
    setPersons([...persons]);
  };

  useEffect(() => {
    fetchPlaying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPersons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnClass =
    "absolute rounded text-white p-2 z-10 outline-none opacity-50 dark:hover:text-highlight-dark hover:text-highlight-deep transition ";

  return (
    <div className="w-full flex">
      <div className="w-4/5 relative">
        <button
          onClick={() => sliderRef?.current?.slickPrev()}
          className={btnClass + "left-0 top-1/2 mx-5 text-2xl bg-primary"}
          type="button"
        >
          <AiOutlineDoubleLeft />
        </button>
        <button
          onClick={() => sliderRef?.current?.slickNext()}
          className={btnClass + "right-0 top-1/2 mx-5 text-2xl bg-primary"}
          type="button"
        >
          <AiOutlineDoubleRight />
        </button>
        <Slider
          ref={sliderRef}
          dots={true}
          infinite={true}
          speed={600}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={!sliderPaused}
          autoplaySpeed={4000}
          pauseOnHover={true}
          pauseOnFocus={true}
          arrows={false}
        >
          {movies.map((movie, index) => (
            <MovieSlide
              key={index}
              onStart={() => setSliderPaused(true)}
              onPause={() => setSliderPaused(false)}
            >
              {movie}
            </MovieSlide>
          ))}
        </Slider>
      </div>

      <div className="relative w-1/5 h-full aspect-video dark:bg-primary bg-white p-5 space-y-3">
        <h1 className="font-semibold text-xl text-highlight-deep dark:text-highlight-dark">
          Who's Popular
        </h1>
        <button
          onClick={() => personSlider?.current?.slickPrev()}
          className={btnClass + "left-0 top-1/3 mx-6"}
          type="button"
        >
          <AiOutlineDoubleLeft />
        </button>
        <button
          onClick={() => personSlider?.current?.slickNext()}
          className={btnClass + "right-0 top-1/3 mx-6"}
          type="button"
        >
          <AiOutlineDoubleRight />
        </button>
        <Slider
          ref={personSlider}
          dots={false}
          infinite={true}
          speed={300}
          slidesToShow={1}
          slidesToScroll={1}
          autoplaySpeed={4000}
          arrows={false}
        >
          {persons.map((p, index) => (
            <PersonSlide key={index}>{p}</PersonSlide>
          ))}
        </Slider>
        <div className="bottom-0 mt-20">
          <PanelLink path="">
            <p>Browse Top-Rated Movies</p>
            <AiOutlineRight />
          </PanelLink>
          <PanelLink path="">
            <p>Browse Top-Rated TVs</p>
            <AiOutlineRight />
          </PanelLink>
        </div>
      </div>
    </div>
  );
}

const PanelLink = ({ children, path }) => {
  return (
    <Link to={path}>
      <div className="flex text-lg dark:text-zinc text-secondary font-semibold dark:hover:text-highlight-dark hover:text-highlight-deep transition items-center my-3 space-x-2">
        {children}
      </div>
    </Link>
  );
};
