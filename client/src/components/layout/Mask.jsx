import React from "react";
import { ARTICLES_FILE_API, BASE_URL } from "../../../config/Constants";

const Mask = ({ image }) => {
  return (
    <div className="mask">
      {image ? (
        <img src={`${BASE_URL}${ARTICLES_FILE_API}/${image}`} />
      ) : (
        <img src="/vite.svg" />
      )}
    </div>
  );
};

export default Mask;
