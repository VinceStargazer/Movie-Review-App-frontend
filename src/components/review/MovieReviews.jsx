import React, { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import Container from "../Container";
import Title from "../movie/Title";
import { getReviewsByMovie } from "../../api/review";
import ReviewCard from "./ReviewCard";

export default function MovieReviews({ movieId, reviewCount, type }) {
  const { updateNotification } = useNotification();

  const [reviews, setReviews] = useState([]);

  const fetchMovieReviews = async () => {
    const { error, reviews } = await getReviewsByMovie(movieId);
    if (error) return updateNotification("error", error);
    setReviews([...reviews]);
  };

  useEffect(() => {
    if (movieId) fetchMovieReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <Container className="p-10 space-y-5">
      <Title
        title="User reviews"
        count={reviewCount}
        to={`/movie/${movieId}/reviews?type=${type}`}
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
        {reviews
          .filter((_, index) => index < 20)
          .map((r, index) => (
            <ReviewCard key={index} review={r} />
          ))}
      </div>
    </Container>
  );
}
