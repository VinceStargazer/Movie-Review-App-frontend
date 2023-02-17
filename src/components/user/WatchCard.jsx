import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { decodeGenre, trimTitle } from "../../utils/helper";
import AddRatingModal from "../modals/AddRatingModal";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateRatingModal from "../modals/UpdateRatingModal";
import StarAndScore from "../review/StarAndScore";

export default function WatchCard({ movie, onDelete }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const {
    id,
    title,
    storyline,
    releaseDate,
    reviews,
    runtime,
    genres,
    type,
    poster,
    directors,
    cast,
    myReview,
  } = movie;

  const { reviewCount, ratingSum } = reviews;

  const handleRatingSuccess = (ratingSum, reviews, singleReview) => {
    onDelete(id);
  };

  const handleRemoveFromList = async () => {
    setBusy(true);
    onDelete(id);
    setBusy(false);
  };

  const movieURL = `/movie/${id}?type=${type}`;
  let genreStr = "";
  for (let i = 0; i < genres.length; i++) {
    genreStr += decodeGenre(genres[[i]]);
    if (i < genres.length - 1) genreStr += ", ";
  }

  return (
    <div>
      <div className="dark:bg-primary bg-white py-3">
        <div className="relative flex space-x-6 border-b pb-10 dark:border-fourth border-light-fourth">
          <Link className="w-1/6" to={movieURL}>
            <img
              className="aspect-auto object-cover drop-shadow-lg"
              src={poster}
              alt=""
            />
          </Link>

          <div className="flex flex-col w-[38rem] space-y-1">
            <Link
              className="dark:text-dark-blue text-light-blue hover:underline transition text-xl"
              to={movieURL}
            >
              {title}
            </Link>
            <div className="flex">
              <Text hasRightBorder>{releaseDate?.substring(0, 4)}</Text>
              <Text className="pl-3" hasRightBorder>
                {type === "movie" ? "Movie" : "TV Series"}
              </Text>
              <Text className="pl-3" hasRightBorder>
                {runtime ? runtime + "m" : "unknown"}
              </Text>
              <Text className="pl-3">{genreStr}</Text>
            </div>

            <div className="flex items-center space-x-3">
              <StarAndScore
                reviewCount={reviewCount}
                ratingSum={ratingSum}
                textStyle="dark:text-zinc text-secondary"
              />
              {myReview ? (
                <EditBtn text={myReview.rating} onClick={() => setShowUpdateModal(true)}>
                  <AiFillStar className="dark:text-dark-blue text-light-blue" />
                </EditBtn>
              ) : (
                <EditBtn text="Rate" onClick={() => setShowReviewModal(true)}>
                  <AiOutlineStar className="dark:text-highlight-dark text-highlight-deep" />
                </EditBtn>
              )}
              <EditBtn text="Delete" onClick={() => setShowConfirmModal(true)}>
                <BsTrash className="dark:text-dark-subtle text-light-subtle" />
              </EditBtn>
            </div>

            <div className="flex items-center">
              {directors.length > 0 && (
                <PeopleRow people={directors} hasRightBorder />
              )}
              <PeopleRow people={cast} hasLeftPadding={directors.length} />
            </div>

            <div className="dark:text-light-fourth text-fourth py-1">
              {trimTitle(storyline, 550)}
            </div>
          </div>
        </div>
      </div>

      {myReview ? (
        <UpdateRatingModal
          reviewId={myReview._id}
          title={title}
          visible={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleRatingSuccess}
          onDelete={onDelete}
          defaultContent={myReview.content}
          defaultRating={new Array(myReview.rating).fill("")}
        />
      ) : (
        <AddRatingModal
          movieId={id}
          type={type}
          title={title}
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSuccess={handleRatingSuccess}
        />
      )}

      <ConfirmModal
        visible={showConfirmModal}
        busy={busy}
        title={
          myReview
            ? `Are you sure to remove your review of ${title}?`
            : `Are you sure to remove ${title} from your watchlist?`
        }
        subtitle={
          myReview
            ? "You can still review it back"
            : "You can still bookmark it later"
        }
        onConfirm={handleRemoveFromList}
        onClose={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

const Text = ({ children, hasRightBorder, className }) => {
  return (
    <span
      className={
        className +
        " pr-3 dark:text-light-fourth text-fourth " +
        (hasRightBorder
          ? "border-r dark:border-fourth border-light-fourth"
          : "")
      }
    >
      {children}
    </span>
  );
};

const EditBtn = ({ children, text, onClick }) => {
  return (
    <button
      type="button"
      className="flex rounded items-center space-x-1 px-2 py-1 dark:hover:bg-tertiary hover:bg-zinc transition"
      onClick={onClick}
    >
      {children}
      <span className="dark:text-zinc text-secondary">{text}</span>
    </button>
  );
};

const PeopleRow = ({ people, hasRightBorder, hasLeftPadding }) => {
  return (
    <div
      className={
        "flex items-center " +
        (hasRightBorder
          ? "border-r dark:border-fourth border-light-fourth pr-3 "
          : "") +
        (hasLeftPadding ? "pl-3" : "")
      }
    >
      {people
        .filter((_, index) => index < 3)
        .map((p, index) => {
          if (index < Math.min(2, people.length - 1)) {
            return (
              <div key={index} className="flex items-center">
                <PersonLink person={p} />
                <p className="dark:text-light-fourth text-fourth mr-2">,</p>
              </div>
            );
          }
          return <PersonLink key={index} person={p} />;
        })}
    </div>
  );
};

const PersonLink = ({ person }) => {
  const { id, name } = person;
  return (
    <Link
      to={"/person/" + id}
      className="dark:text-dark-blue text-light-blue hover:underline transition"
    >
      {name}
    </Link>
  );
};
