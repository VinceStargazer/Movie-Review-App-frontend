/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { bookmark, getSimpleWatched, getSimpleWatchlist, unbookmark } from "../../api/user";
import { useAuth, useNotification } from "../../hooks";
import { trimTitle } from "../../utils/helper";
import AddRatingModal from "../modals/AddRatingModal";
import StarAndScore from "../review/StarAndScore";
import Bookmark from "./Bookmark";

export default function MovieCard({ movie }) {
  const { id, type, title, backdrop, reviews } = movie;

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const userId = authInfo?.profile?.id;
  const navigate = useNavigate();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(reviews.reviewCount);
  const [ratingSum, setRatingSum] = useState(reviews.ratingSum);
  const [status, setStatus] = useState(0); // 0: default, 1: bookmarked, 2: reviewed
  const [hovered, setHovered] = useState(false);
  const [busy, setBusy] = useState(false);

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
    if (userId) {
      fetchWatchlist();
      fetchWatched();
    }
  }, [userId]);

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="dark:bg-tertiary dark:bg-opacity-50 bg-white dark:hover:bg-opacity-70 transition drop-shadow-lg rounded"
      >
        <Bookmark status={status} busy={busy} onClick={handleBookmark} />
        <Link to={"/movie/" + id + "?type=" + type}>
          <img
            className={
              "aspect-video object-cover transition mb-1 " +
              (hovered ? "opacity-80" : "")
            }
            src={backdrop}
            alt={title}
          />
        </Link>

        <div className="px-2 py-1">
          <Link to={"/movie/" + id + "?type=" + type}>
            <h1
              className="text-md dark:text-white text-primary hover:underline"
              title={title}
            >
              {trimTitle(title)}
            </h1>
          </Link>

          <div className="flex space-x-2">
            <StarAndScore ratingSum={ratingSum} reviewCount={reviewCount} />
            {status < 2 && <button
              type="button"
              onClick={handleRateMovie}
              className="px-3 py-1 hover:dark:bg-tertiary hover:bg-zinc transition dark:text-dark-blue text-light-blue hover:dark:text-white hover:text-primary"
            >
              <AiOutlineStar />
            </button>}
          </div>
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
