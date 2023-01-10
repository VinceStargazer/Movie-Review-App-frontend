import React from "react";
import { trimTitle } from "../../utils/helper";
import LikesAndDislikes from "./LikesAndDislikes";
import UserLabel from "./UserLabel";

export default function ReviewCard({ review }) {
  const { id, owner, rating, content, likes, dislikes } = review;

  return (
    <div className="drop-shadow-lg rounded dark:bg-secondary bg-white hover:bg-opacity-90 transition py-2 px-3 space-y-3">
      <UserLabel name={owner.name} rating={rating} to="" />
      <p value={content} className="dark:text-zinc text-secondary">
        {trimTitle(content, 300)}
      </p>
      <LikesAndDislikes id={id} likes={likes} dislikes={dislikes} />
    </div>
  );
}
