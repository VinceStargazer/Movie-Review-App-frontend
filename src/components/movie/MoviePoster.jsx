/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { trimTitle } from "../../utils/helper";
import AddRatingModal from "../modals/AddRatingModal";
import Bookmark from "./Bookmark";
import Submit from "../form/Submit";
import { useAuth, useNotification } from "../../hooks";
import StarAndScore from "../review/StarAndScore";
import { bookmark, getSimpleWatched, getSimpleWatchlist, unbookmark } from "../../api/user";

export default function MoviePoster({
  movie,
  ignoreAddWatchlist,
  defaultStatus = 0,
}) {
  const { id, type, title, poster, reviews } = movie;

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(reviews.reviewCount);
  const [ratingSum, setRatingSum] = useState(reviews.ratingSum);
  const [status, setStatus] = useState(defaultStatus);
  const [busy, setBusy] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const userId = authInfo?.profile?.id;
  const navigate = useNavigate();

  const handleRatingSuccess = (ratingSum, reviews, singleReview) => {
    setReviewCount(reviews.length);
    setRatingSum(ratingSum);
    setStatus(2);
  };

  const handleBookmark = async () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    if (status === 0) {
      setBusy(true);
      const { error, message } = await bookmark(id, type);
      setBusy(false);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);
      setStatus(1);
    } else if (status === 1) {
      setBusy(true);
      const { error, message } = await unbookmark(id, type);
      setBusy(false);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);
      setStatus(0);
    } else {
      updateNotification("success", "You have reviewed this movie");
    }
  };

  const handleRateMovie = () => {
    if (!authInfo.isLoggedIn) return navigate("/auth/login");
    setShowReviewModal(true);
  };

  const fetchWatchlist = async () => {
    const { error, watchlist } = await getSimpleWatchlist(type);
    if (error) return updateNotification("error", error);
    if (watchlist.includes(id.toString())) setStatus(1);
  };

  const fetchWatched = async () => {
    const { error, watched } = await getSimpleWatched(type);
    if (error) return updateNotification("error", error);
    if (watched.includes(id.toString())) setStatus(2);
  };

  useEffect(() => {
    if (userId && !defaultStatus) {
      fetchWatchlist();
      fetchWatched();
    }
  }, [userId]);

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative dark:bg-secondary bg-white hover:bg-opacity-90 transition drop-shadow-lg rounded"
      >
        <Bookmark status={status} busy={busy} onClick={handleBookmark} />
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
              {status === 1 ? <FiMinus /> : <FiPlus />}
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
