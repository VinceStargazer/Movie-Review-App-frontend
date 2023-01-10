import { catchError, getHeaders } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
  try {
    const { data } = await client.post("/actor/create", formData, {
      headers: getHeaders()
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchActor = async (query) => {
  try {
    const { data } = await client(`/actor/search?name=${query}`, {
      headers: getHeaders()
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getPerson = async (personId) => {
  try {
    const { data } = await client("/person/" + personId);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export const getPersonImages = async (personId) => {
  try {
    const { data } = await client("/person/" + personId + "/images");
    return data;
  } catch (error) {
    return catchError(error);
  }
}
