import React, { useEffect, useState } from "react";
import { MdFindInPage, MdViewList } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import {
  getReviewByUserAndMovie,
  getReviewsByMovie,
  removeReview,
} from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import StdContainer from "../StdContainer";
import AddRatingModal from "../modals/AddRatingModal";
import Loading from "../user/Loading";
import ReviewCardLong from "./ReviewCardLong";
import MyReviewCard from "./MyReviewCard";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateRatingModal from "../modals/UpdateRatingModal";
import MoviePageHead from "../movie/MoviePageHead";
import GalleryBar from "../movie/GalleryBar";

const btnClass =
  "flex items-center text-left rounded dark:text-primary text-white dark:bg-highlight-dark bg-highlight-deep transition px-2 py-1 drop-shadow w-full hover:bg-opacity-90 dark:hover:bg-opacity-90";

export default function MovieReviewPage() {
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [userReview, setUserReview] = useState({});
  const [reviewCnt, setReviewCnt] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewFound, setReviewFound] = useState(false);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const [searchParams] = useSearchParams();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(
      movieId,
      searchParams.get("type") || "movie"
    );
    if (error) return updateNotification("error", error);
    setMovie(movie);
  };

  const fetchUserReview = async () => {
    const review = await getReviewByUserAndMovie(movieId);
    setUserReview({ ...review });
  };

  const fetchMovieReviews = async () => {
    const { error, reviews } = await getReviewsByMovie(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setUserReviews([...reviews]);
    setReviewCnt(reviews.length);
  };

  const handleRateMovie = () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    setShowReviewModal(true);
  };

  const handleRatingSuccess = (ratingSum, reviews, singleReview) => {
    setUserReview({ ...singleReview });
    setUserReviews([...reviews]);
    setReviewCnt(reviews.length);
    setReviewFound(true);
  };

  const handleDeleteReview = async () => {
    const { error, message } = await removeReview(userReview.id);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setReviewFound(false);
    setUserReviews(userReviews.filter((r) => r.id !== userReview.id));
    setReviewCnt(reviewCnt - 1);
    setUserReview({});
    setShowConfirmModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId) {
      fetchMovie();
      fetchMovieReviews();
      fetchUserReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (!ready) return <Loading />;

  const { title, type } = movie;

  return (
    <StdContainer>
      <Container className="p-10 space-y-5">
        <MoviePageHead movie={movie} subtitle="User Reviews">
          {!userReview.rating && (
            <button className={btnClass} onClick={handleRateMovie}>
              <IoAddCircle className="mr-1" />
              Review this title
            </button>
          )}

          {userReview.rating && (
            <button
              className={btnClass}
              onClick={() => setReviewFound(!reviewFound)}
            >
              {reviewFound ? (
                <MdViewList className="mr-1" />
              ) : (
                <MdFindInPage className="mr-1" />
              )}
              {reviewFound ? "View all reviews" : "Find my review"}
            </button>
          )}
        </MoviePageHead>

        <GalleryBar>
          {!reviewFound ? reviewCnt + " Reviews" : "Your review"}
        </GalleryBar>

        {!reviewFound && (
          <div className="flex flex-col space-y-5">
            {userReviews.map((r, index) => (
              <ReviewCardLong key={index} review={r} />
            ))}
          </div>
        )}

        {reviewFound && (
          <div>
            <MyReviewCard
              review={userReview}
              onEdit={() => setShowUpdateModal(true)}
              onDelete={() => setShowConfirmModal(true)}
            />
          </div>
        )}
      </Container>

      <AddRatingModal
        movieId={movieId}
        type={type}
        title={title}
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSuccess={handleRatingSuccess}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure to delete this review?"
        subtitle="This action will remove your review permanently."
        onConfirm={handleDeleteReview}
        onClose={() => setShowConfirmModal(false)}
      />

      <UpdateRatingModal
        reviewId={userReview.id}
        title={title}
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={handleRatingSuccess}
        defaultContent={userReview.content}
        defaultRating={new Array(userReview.rating).fill("")}
      />
    </StdContainer>
  );
}
