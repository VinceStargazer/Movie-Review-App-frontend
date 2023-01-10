/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { YOUTUBE_PATH } from "../../utils/config";
import { getSingleMovie, getVideos } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import MoviePageHead from "../movie/MoviePageHead";
import StdContainer from "../StdContainer";
import Loading from "../user/Loading";
import { trimTitle } from "../../utils/helper";
import GalleryBar from "../movie/GalleryBar";
import { ImSpinner3 } from "react-icons/im";
import Pagination from "../Pagination";

const videoPerPage = 6;

export default function MovieVideosPage() {
  const { updateNotification } = useNotification();

  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const [currPage, setCurrPage] = useState(0);
  const [videos, setVideos] = useState([]);
  const [videosToShow, setVideosToShow] = useState([]);

  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId, type);
    if (error) return updateNotification("error", error);
    setMovie(movie);
  };

  const fetchVideos = async () => {
    const { error, videos } = await getVideos(movieId, type);
    if (error) return updateNotification("error", error);
    setReady(true);
    setVideos(videos);
    setVideosToShow(videos?.slice(0, videoPerPage));
  };

  const handleBtnClick = (index) => {
    setCurrPage(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId) {
      fetchMovie();
      fetchVideos();
    }
  }, [movieId]);

  useEffect(() => {
    setVideosToShow(
      videos?.slice(currPage * videoPerPage, (currPage + 1) * videoPerPage)
    );
  }, [currPage]);

  if (!ready) return <Loading />;

  const pages = Math.floor((videos.length + videoPerPage - 1) / videoPerPage);

  return (
    <StdContainer>
      <Container className="p-10 space-y-5">
        <MoviePageHead movie={movie} subtitle="Video Gallery" />

        <GalleryBar>{videos.length + " Videos"}</GalleryBar>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {videosToShow?.map((v, index) => (
            <VideoCard video={v} key={index} />
          ))}
        </div>

        <Pagination
          currPage={currPage}
          itemPerPage={videoPerPage}
          items={videos}
          type="videos"
          onClick={handleBtnClick}
          onNext={() => setCurrPage((currPage + 1) % pages)}
        />
      </Container>
    </StdContainer>
  );
}

const VideoCard = ({ video }) => {
  const { name, key } = video;
  const [busy, setBusy] = useState(true);

  return (
    <div className="drop-shadow-lg flex flex-col items-center justify-center relative space-y-3">
      {busy && (
        <ImSpinner3
          className="animate-spin dark:text-light-fourth text-fourth absolute"
          size={40}
        />
      )}
      <iframe
        loading="lazy"
        onLoad={() => setBusy(false)}
        src={YOUTUBE_PATH + key}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={name}
      />
      <span className="dark:text-gray text-tertiary text-sm" title={name}>
        {trimTitle(name, 45)}
      </span>
    </div>
  );
};
