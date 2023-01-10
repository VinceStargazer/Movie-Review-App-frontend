import { catchError, getHeaders } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: getHeaders(),
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 1000));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const uploadMovie = async (formData) => {
  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTrendingMovies = async (type) => {
  try {
    let endpoint = "/movie/trending";
    if (type) endpoint = endpoint + "?type=" + type;
    const { data } = await client(endpoint);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getNowPlaying = async (type) => {
  try {
    let endpoint = "/movie/now-playing";
    if (type) endpoint = endpoint + "?type=" + type;
    const { data } = await client(endpoint);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getPopularPersons = async () => {
  try {
    const { data } = await client("/person/popular");
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleMovie = async (id, type = "movie") => {
  try {
    const { data } = await client("/movie/" + id + "?type=" + type);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSimilarMovies = async (id, type = "movie") => {
  try {
    const { data } = await client("/movie/" + id + "/similar?type=" + type);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getCredits = async (id, type = "movie") => {
  try {
    const { data } = await client("/movie/" + id + "/credits?type=" + type);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getVideos = async (id, type = "movie") => {
  try {
    const { data } = await client("/movie/" + id + "/videos?type=" + type);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMovieImages = async (id, type = "movie") => {
  try {
    const { data } = await client("/movie/" + id + "/images?type=" + type);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
