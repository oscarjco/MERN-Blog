import {
  ARTICLES_API,
  ARTICLES_FILE_API,
  ARTICLES_SEARCH_API,
  BASE_URL,
} from "../../config/Constants";
import { useAjax } from "./useAjax";

const list = async (filter = "sort=-date") => {
  const { status, message, data } = await useAjax(
    BASE_URL + ARTICLES_API + "?" + filter
  );

  if (status === "Success" && data) {
    return data;
  } else throw new Error(message);
};

const get = async (id) => {
  const { status, message, data } = await useAjax(
    BASE_URL + ARTICLES_API + "/" + id
  );

  if (status === "Success" && data) {
    return data;
  } else throw new Error(message);
};

const find = async (query) => {
  const { status, message, data } = await useAjax(
    BASE_URL + ARTICLES_SEARCH_API + "/" + query
  );

  if (status === "Success") {
    return data;
  } else throw new Error(message);
};

const post = async (article) => {
  const { status, message, data } = await useAjax(
    BASE_URL + ARTICLES_API,
    "POST",
    article
  );

  if (status === "Success") {
    await saveFile(data._id);
    return true;
  } else throw new Error(message);
};

const put = async (id, article) => {
  const { status, message, data } = await useAjax(
    BASE_URL + ARTICLES_API + "/" + id,
    "PUT",
    article
  );

  if (status === "Success") {
    await saveFile(data._id);
    return true;
  } else throw new Error(message);
};

const remove = async (id) => {
  const { status } = await useAjax(
    BASE_URL + ARTICLES_API + "/" + id,
    "DELETE"
  );

  if (status === "Success") {
    return true;
  } else throw new Error(message);
};

const saveFile = async (articleId) => {
  const fileInput = document.querySelector("#file");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  if (articleId && formData.get("file") !== "undefined") {
    await useAjax(
      BASE_URL + ARTICLES_FILE_API + "/" + articleId,
      "POST",
      formData,
      true
    );
  }
};

export { list, get, find, post, put, remove, saveFile };
