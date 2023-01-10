import React from "react";
import { initialColors } from "../../utils/options";
import UserLabel from "./UserLabel";
import EditAndDelete from "./EditAndDelete";

export default function MyReviewCard({ review, onEdit, onDelete }) {
  const { id, owner, rating, content } = review;

  const initial = owner.name[0].toUpperCase();

  return (
    <div className="dark:bg-secondary bg-zinc rounded px-3 py-2 drop-shadow-lg flex space-x-3 items-center">
      <div
        className={
          "flex items-center justify-center w-10 h-10 rounded-full select-none text-xl text-white " +
          initialColors.get(initial)
        }
      >
        {initial}
      </div>
      <div className="space-y-2">
        <UserLabel name={owner.name} rating={rating} to="" />
        <p className="dark:text-zinc text-secondary">{content}</p>
        <EditAndDelete reviewId={id} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
