import React from "react";
import { initialColors } from "../../utils/options";
import LikesAndDislikes from "./LikesAndDislikes";
import UserLabel from "./UserLabel";

export default function ReviewCardLong({ review }) {
  const { id, owner, rating, content, likes, dislikes } = review;

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
        <LikesAndDislikes reviewId={id} likes={likes} dislikes={dislikes} />
      </div>
    </div>
  );
}
