import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { trimTitle } from "../../utils/helper";
import AddRatingModal from "../modals/AddRatingModal";
import Bookmark from "./Bookmark";
import Submit from "../form/Submit";
import { useAuth } from "../../hooks";
import StarAndScore from "../review/StarAndScore";

export default function MoviePoster({
  movie,
  ignoreAddWatchlist,
  defaultMark = false,
}) {
  const { id, type, title, poster, reviews } = movie;

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(reviews.reviewCount);
  const [ratingSum, setRatingSum] = useState(reviews.ratingSum);
  const [isBookmarked, setIsBookMarked] = useState(defaultMark);
  const [hovered, setHovered] = useState(false);

  const { authInfo } = useAuth();
  const navigate = useNavigate();

  const handleRatingSuccess = (ratingSum, reviews, singleReview) => {
    setReviewCount(reviews.length);
    setRatingSum(ratingSum);
  };

  const handleBookmark = () => {
    setIsBookMarked(!isBookmarked);
  };

  const handleRateMovie = () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    setShowReviewModal(true);
  };

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative dark:bg-secondary bg-white hover:bg-opacity-90 transition drop-shadow-lg rounded"
      >
        <Bookmark isBookmarked={isBookmarked} onClick={handleBookmark} />
        <Link to={"/movie/" + id + "?type=" + type}>
          <img
            className={
              "w-64 h-80 object-cover transition " +
              (hovered ? "opacity-80" : "")
            }
            src={poster}
            alt={title}
          />
        </Link>

        <div className="p-3 space-y-3">
          <div className="flex items-center space-x-6">
            <StarAndScore ratingSum={ratingSum} reviewCount={reviewCount} />
            <button
              type="button"
              onClick={handleRateMovie}
              className="px-3 py-1 hover:dark:bg-tertiary hover:bg-zinc transition dark:text-dark-blue text-light-blue hover:dark:text-white hover:text-primary"
            >
              <AiOutlineStar />
            </button>
          </div>

          <Link to={"/movie/" + id + "?type=" + type}>
            <h1
              className="my-2 text-md dark:text-zinc text-secondary hover:underline"
              title={title}
            >
              {trimTitle(title, 20)}
            </h1>
          </Link>

          {!ignoreAddWatchlist && (
            <Submit
              onClick={handleBookmark}
              className="h-8 space-x-1 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc justify-center"
            >
              {isBookmarked ? <FiMinus /> : <FiPlus />}
              <h1>Watchlist</h1>
            </Submit>
          )}
        </div>
      </div>

      <AddRatingModal
        movieId={id}
        type={type}
        title={title}
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSuccess={handleRatingSuccess}
      />
    </div>
  );
}
