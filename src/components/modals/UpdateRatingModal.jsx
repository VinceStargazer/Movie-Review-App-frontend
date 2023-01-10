import React from "react";
import { updateReview } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "./RatingForm";

export default function UpdateRatingModal({
  reviewId,
  title,
  visible,
  onClose,
  onSuccess,
  onDelete,
  defaultContent,
  defaultRating,
}) {
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    if (!data.rating) return;
    const { error, message, ratingSum, reviews, singleReview } =
      await updateReview(reviewId, JSON.stringify(data));
    if (error) return updateNotification("error", error);
    onSuccess(ratingSum, reviews, singleReview);
    updateNotification("success", message);
  };

  return (
    <RatingForm
      title={title}
      action="Update"
      visible={visible}
      onClose={onClose}
      onDelete={onDelete}
      onSubmit={handleSubmit}
      defaultRating={defaultRating}
      defaultContent={defaultContent}
    />
  );
}
