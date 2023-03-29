import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { get } from "../../../hooks/useArticleApi";
import { Mask } from "../../layout";

const ArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getArticle = async () => {
    await get(id)
      .then((data) => setArticle(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    getArticle();
    setLoading(false);
  }, [id]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="card">
          <Mask image={article.image} />
          <h1 className="title">{article.title}</h1>
          <i className="date">
            {dateFormat(article.date, "paddedShortDate")}{" "}
            {dateFormat(article.date, "shortTime")}
          </i>
          <p className="description">{article.content}</p>
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
