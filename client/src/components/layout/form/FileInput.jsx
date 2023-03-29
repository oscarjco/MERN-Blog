import React from "react";
import { ARTICLES_FILE_API, BASE_URL } from "../../../../config/Constants";

const FileInput = ({ label, image }) => {
  return (
    <>
      <label htmlFor="file">{label}</label>
      {image && (
        <img src={`${BASE_URL}${ARTICLES_FILE_API}/${image}`} />
      )}
      <input type="file" id="file" name="file" />
    </>
  );
};

export default FileInput;
