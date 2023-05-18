import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineRight,
  AiOutlineStar,
} from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdVideoLibrary, MdOutlinePhotoLibrary } from "react-icons/md";
import { getSingleMovie } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import { decodeMovieGenres, decodeTvGenres } from "../../utils/genres";
import SimilarMovies from "./SimilarMovies";
import Title from "./Title";
import MovieInfoRow from "./MovieInfoRow";
import AddRatingModal from "../modals/AddRatingModal";
import UpdateRatingModal from "../modals/UpdateRatingModal";
import { getReviewByUserAndMovie, removeReview } from "../../api/review";
import MovieReviews from "../review/MovieReviews";
import Submit from "../form/Submit";
import CastCard from "./CastCard";
import LibraryBlock from "./LibraryBlock";
import Loading from "../user/Loading";
import ConfirmModal from "../modals/ConfirmModal";
import { ImSpinner3 } from "react-icons/im";
import { bookmark, unbookmark } from "../../api/user";

const ratingClass =
  "flex items-center p-2 hover:dark:bg-secondary hover:bg-zinc transition cursor-pointer rounded";

export default function SingleMovie() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [videoBusy, setVideoBusy] = useState(true);
  const [movie, setMovie] = useState({});
  const [userReview, setUserReview] = useState({});
  const [reviewCnt, setReviewCnt] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isBookmarked, setIsBookMarked] = useState(false);

  const { movieId } = useParams();
  const [searchParams] = useSearchParams();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(
      movieId,
      searchParams.get("type") || "movie"
    );
    if (error) return updateNotification("error", error);
    setReady(true);
    setMovie(movie);
    setReviewCnt(movie.reviews.length);
  };

  const fetchUserReview = async () => {
    const review = await getReviewByUserAndMovie(movieId);
    setUserReview({ ...review });
  };

  const handleRateMovie = () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    setShowReviewModal(true);
  };

  const handleBookmark = async () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    if (!isBookmarked) {
      const { error, message } = await bookmark(movieId, type);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);
    } else {
      const { error, message } = await unbookmark(movieId, type);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);
    }
    setIsBookMarked(!isBookmarked);
  };

  const handleRatingSuccess = (ratingSum, reviews, singleReview) => {
    setUserReview({ ...singleReview });
    setMovie({ ...movie, reviews, ratingSum });
    setReviewCnt(reviews.length);
  };

  const handleEmptyReview = () => {
    if (!reviewCnt) return updateNotification("warning", "No review exists!");
  };

  const handleDeleteReview = async () => {
    setBusy(true);
    const { error, message } = await removeReview(userReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    const reviews = movie.reviews.filter((r) => r.id !== userReview.id);
    setMovie({
      ...movie,
      reviews,
      ratingSum: movie.ratingSum - userReview.rating,
    });

    setUserReview({});
    setShowReviewModal(false);
    setShowConfirmModal(false);
    setReviewCnt(reviewCnt - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId) {
      fetchMovie();
      fetchUserReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (!ready) return <Loading />;

  const {
    tmdb_id,
    title,
    type,
    storyline,
    releaseDate,
    genres,
    languages,
    homepage,
    runtime,
    poster,
    trailer,
    directors,
    cast,
    reviews,
    ratingSum,
  } = movie;

  const reviewURL = `/movie/${tmdb_id}/reviews?type=${type}`;
  const creditsURL = `/movie/${movieId}/credits?type=${type}`;

  return (
    <div className="dark:bg-primary bg-white">
      <Container className="p-10 space-y-3">
        <div className="flex justify-between">
          <h1 className="text-5xl text-primary dark:text-white">{title}</h1>
          <div className="flex items-center space-x-1">
            {reviewCnt ? (
              <Link to={reviewURL} className={ratingClass}>
                <span className="text-2xl text-highlight-deep dark:text-highlight-dark mx-1">
                  <AiFillStar />
                </span>
                <span className="text-2xl text-primary dark:text-white font-semibold">
                  {(ratingSum / parseFloat(reviewCnt)).toFixed(1)}
                </span>
                <span className="text-xl text-light-subtle dark:text-dark-subtle">
                  /10
                </span>
                <span className="text-md text-light-subtle dark:text-dark-subtle mx-3 hover:underline transition cursor-pointer">
                  {(reviews.length > 999
                    ? (reviewCnt / parseFloat(1000)).toFixed(1) + "K"
                    : reviewCnt) + " Reviews"}
                </span>
              </Link>
            ) : (
              <p className="text-2xl p-2 text-light-subtle dark:text-dark-subtle">
                N/A
              </p>
            )}

            <button
              type="button"
              className={ratingClass}
              onClick={handleRateMovie}
            >
              <span className="text-2xl text-light-blue dark:text-dark-blue mx-1">
                {userReview.rating ? <AiFillStar /> : <AiOutlineStar />}
              </span>
              {userReview.rating && (
                <div className="flex items-center">
                  <span className="text-2xl text-primary dark:text-white font-semibold">
                    {userReview.rating}
                  </span>
                  <span className="text-xl text-light-subtle dark:text-dark-subtle">
                    /10
                  </span>
                  <span className="text-md text-light-subtle dark:text-dark-subtle mx-3">
                    Your Rating
                  </span>
                </div>
              )}
              {!userReview.rating && (
                <span className="text-xl text-light-blue dark:text-dark-blue font-semibold">
                  Rate
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex">
          <p className="text-md text-light-subtle dark:text-dark-subtle">
            {(type === "movie" ? "Movie" : "TV Series") +
              " · " +
              (releaseDate ? releaseDate.substring(0, 7) : "unknown") +
              " · " +
              (runtime ? runtime + "m" : "unknown")}
          </p>
        </div>

        <div className="w-full flex space-x-1">
          <a href={poster} target="_blank" rel="noreferrer" className="w-1/5">
            <img
              title="Click to view the poster"
              className="h-full aspect-auto object-cover drop-shadow-lg"
              src={poster}
              alt=""
            />
          </a>

          <div className="flex w-3/5 drop-shadow-lg items-center justify-center relative">
            {videoBusy && (
              <ImSpinner3
                className="animate-spin dark:text-light-fourth text-fourth absolute"
                size={50}
              />
            )}
            <iframe
              className="w-full h-full aspect-video"
              onLoad={() => setVideoBusy(false)}
              src={trailer}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            />
          </div>

          <div className="w-1/5 space-y-1">
            <LibraryBlock to={`/movie/${movieId}/videos?type=${type}`}>
              <MdVideoLibrary className="text-5xl" />
              <h1 className="font-mono">MORE VIDEOS</h1>
            </LibraryBlock>
            <LibraryBlock to={`/movie/${movieId}/images?type=${type}`}>
              <MdOutlinePhotoLibrary className="text-5xl" />
              <h1 className="font-mono">MORE PHOTOS</h1>
            </LibraryBlock>
            <div className="h-1/2 text-center items-center"></div>
          </div>
        </div>

        <div className="flex space-x-3">
          {genres.map((g, index) => (
            <Link
              key={index}
              to=""
              className="mt-3 outline-1 outline text-primary dark:text-white px-3 py-1 rounded-3xl hover:dark:bg-secondary hover:bg-zinc dark:outline-dark-subtle outline-light-subtle"
            >
              {type === "movie"
                ? decodeMovieGenres.get(parseInt(g))
                : decodeTvGenres.get(parseInt(g))}
            </Link>
          ))}
        </div>

        <div className="flex space-x-16">
          <div className="w-2/3">
            <p className="px-1 py-3 text-tertiary dark:text-gray border-b dark:border-fourth border-light-fourth">
              {storyline}
            </p>
            <MovieInfoRow
              title="Creators"
              data={directors?.slice(0, 3)}
              to={creditsURL}
            />
            <MovieInfoRow
              title="Stars"
              data={cast?.slice(0, 3)}
              to={creditsURL}
            />
            <MovieInfoRow title="Languages" data={languages?.slice(0, 3)} />
          </div>

          <div className="w-1/3 space-y-5">
            <div className="space-y-2">
              <Submit
                className="h-10 space-x-2 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc"
                onClick={handleBookmark}
              >
                {isBookmarked ? <FiMinus /> : <FiPlus />}
                <h1>
                  {(isBookmarked ? "Remove from" : "Add to") + " Watchlist"}
                </h1>
              </Submit>

              <Submit className="h-10 space-x-2 dark:bg-tertiary bg-gray dark:text-white text-primary hover:dark:bg-fourth hover:bg-light-fourth dark:hover:bg-opacity-70 hover:bg-opacity-70">
                <AiOutlineHome />
                <a href={homepage} target="_blank" rel="noreferrer">
                  Visit homepage
                </a>
              </Submit>
            </div>

            <div
              className="hover:underline transition dark:text-dark-blue text-light-blue"
              onClick={handleEmptyReview}
            >
              <Link to={reviews.length ? reviewURL : ""}>
                {reviews.length + " User reviews"}
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Cast section */}
      <Container className="p-10 space-y-5">
        <Title title="Top cast" to={creditsURL} />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {cast?.map((c, index) => (
            <CastCard person={c} key={index} />
          ))}
        </div>
        <Link
          to={creditsURL}
          className="w-72 relative flex items-center py-3 px-2 hover:dark:bg-secondary hover:bg-zinc transition"
        >
          <p className="text-primary dark:text-white mr-5 font-semibold">
            View all cast & crew
          </p>
          <div className="absolute right-0 dark:text-white text-primary transition dark:hover:text-highlight-dark hover:text-highlight-deep">
            <AiOutlineRight />
          </div>
        </Link>
      </Container>

      <SimilarMovies movieId={movieId} type={type} />

      <MovieReviews
        movieId={movieId}
        reviewCount={reviews.length}
        type={type}
      />

      {!userReview.rating ? (
        <AddRatingModal
          movieId={movieId}
          type={type}
          title={title}
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSuccess={handleRatingSuccess}
        />
      ) : (
        <UpdateRatingModal
          reviewId={userReview.id}
          title={title}
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSuccess={handleRatingSuccess}
          onDelete={() => setShowConfirmModal(true)}
          defaultContent={userReview.content}
          defaultRating={new Array(userReview.rating).fill("")}
        />
      )}

      <ConfirmModal
        visible={showConfirmModal}
        busy={busy}
        title="Are you sure to delete this review?"
        subtitle="This action will remove your review permanently."
        onConfirm={handleDeleteReview}
        onClose={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
