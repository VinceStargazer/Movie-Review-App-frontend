import { catchError, getHeaders } from "../utils/helper";
import client from "./client";

export const getWatchlist = async (type = "movie") => {
  try {
    const { data } = await client("/user/watchlist?type=" + type, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getWatched = async (type = "movie") => {
  try {
    const { data } = await client("/user/watched?type=" + type, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSimpleWatchlist = async (type = "movie") => {
  try {
    const { data } = await client("/user/watchlist-simple?type=" + type, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSimpleWatched = async (type = "movie") => {
  try {
    const { data } = await client("/user/watched-simple?type=" + type, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const bookmark = async (movieId, type = "movie") => {
  try {
    const { data } = await client.post(`/user/bookmark/${movieId}?type=${type}`, {}, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const unbookmark = async (movieId, type = "movie") => {
  try {
    const { data } = await client.post(`/user/unbookmark/${movieId}?type=${type}`, {}, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
