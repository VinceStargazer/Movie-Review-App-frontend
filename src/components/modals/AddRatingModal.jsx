import React from "react";
import { addReview } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "./RatingForm";

export default function AddRatingModal({
  movieId,
  type,
  title,
  visible,
  onClose,
  onSuccess,
}) {
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    if (!data.rating) return;
    const { error, message, ratingSum, reviews, singleReview } =
      await addReview(movieId, type, JSON.stringify(data));
    if (error) return updateNotification("error", error);
    onSuccess(ratingSum, reviews, singleReview);
    updateNotification("success", message);
  };

  return (
    <RatingForm
      title={title}
      action="Rate"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultRating={[]}
      defaultContent=""
    />
  );
}
