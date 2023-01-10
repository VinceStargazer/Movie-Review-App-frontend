import React, { useState } from "react";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function MovieSlide({ key, children, onStart, onPause }) {
  const playBtnClass = "absolute left-5 bottom-20 z-30 text-7xl text-white text-opacity-50 hover:text-highlight-deep dark:hover:text-highlight-dark transition hover:text-opacity-80 hover:dark:text-opacity-80";

  const { trailer, title, id, backdrop, type } = children;
  const [videoVisible, setVideoVisible] = useState(false);
  const handleVideoStart = () => {
    setVideoVisible(true);
    onStart();
  }

  const handleVideoPause = () => {
    setVideoVisible(false);
    onPause();
  }

  return (
    <div className="relative" key={key}>
      {videoVisible && <iframe
        className="absolute left-0 top-0 z-20 w-full h-full"
        src={trailer + "?autoplay=1"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Movie Trailer"
      ></iframe>}
      {!videoVisible && <button
        type="button"
        onClick={handleVideoStart}
        className={playBtnClass}
      >
        <BsPlayCircle />
      </button>}

      {videoVisible && <button
        type="button"
        onClick={handleVideoPause}
        className={playBtnClass}
      >
        <BsStopCircle />
      </button>}

      <Link to={"movie/" + id + "?type=" + type} disabled={videoVisible}>
        <img
          className="aspect-video object-cover cursor-pointer"
          src={backdrop}
          alt=""
        />
        <div className="w-full absolute left-0 bottom-0 p-5 z-10 bg-gradient-to-t from-white dark:from-primary">
          <h1 className="font-semibold text-3xl dark:text-highlight-dark text-highlight-deep drop-shadow cursor-pointer">
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
}
