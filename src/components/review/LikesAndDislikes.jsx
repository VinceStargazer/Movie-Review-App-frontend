import React, { useEffect, useState } from "react";
import { dislikeReview, likeReview } from "../../api/review";

import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useNotification } from "../../hooks";

const btnClass =
  "p-1 dark:text-dark-subtle text-light-subtle rounded-full transition hover:dark:bg-tertiary hover:bg-gray";

export default function LikesAndDislikes({ reviewId, likes, dislikes }) {
  const { updateNotification } = useNotification();

  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [dislikeCount, setDislikeCount] = useState(dislikes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    return async () => {
      if (isLiked) await likeReview(reviewId);
      else if (isDisliked) await dislikeReview(reviewId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // needs fixing
  const handleLikeReview = async () => {
    if (isDisliked) handleDislikeReview();
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(!isLiked);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(!isLiked);
      const { error, message } = await likeReview(reviewId);
      if (error) return updateNotification("error", error);
      updateNotification("Success", message);
    }
  };

  const handleDislikeReview = () => {
    if (isLiked) handleLikeReview();
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(!isDisliked);
    } else {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(!isDisliked);
    }
  };

  return (
    <div className="text-sm flex items-center space-x-4 dark:text-dark-subtle text-light-subtle">
      <div className="flex items-center">
        <button className={btnClass} onClick={handleLikeReview}>
          {!isLiked ? <AiOutlineLike size={18} /> : <AiFillLike size={18} />}
        </button>
        <span>{likeCount}</span>
      </div>

      <div className="relative flex items-center">
        <button className={btnClass} onClick={handleDislikeReview}>
          {!isDisliked ? (
            <AiOutlineDislike size={18} />
          ) : (
            <AiFillDislike size={18} />
          )}
        </button>
        <span>{dislikeCount}</span>
      </div>
    </div>
  );
}
