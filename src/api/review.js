import { catchError, getHeaders } from "../utils/helper";
import client from "./client";

export const addReview = async (movieId, type = "movie", reviewData) => {
  try {
    const { data } = await client.post(
      "/review/add/" + movieId + "?type=" + type,
      reviewData,
      {
        headers: getHeaders(),
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const { data } = await client.patch("/review/" + reviewId, reviewData, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewByUserAndMovie = async (movieId) => {
  try {
    const { data } = await client(
      "/review/get-review-by-user-and-movie/" + movieId,
      {
        headers: getHeaders(),
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewsByMovie = async (movieId) => {
  try {
    const { data } = await client("/review/get-reviews-by-movie/" + movieId);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const likeReview = async (reviewId) => {
  try {
    const { data } = await client.patch("/review/like/" + reviewId, {}, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const dislikeReview = async (reviewId) => {
  try {
    const { data } = await client.patch("/review/dislike/" + reviewId, {}, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const removeReview = async (reviewId) => {
  try {
    const { data } = await client.delete("/review/" + reviewId, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};