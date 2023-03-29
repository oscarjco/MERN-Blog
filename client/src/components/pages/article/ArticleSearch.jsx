import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { find } from "../../../hooks/useArticleApi";
import ArticleItem from "./ArticleItem";

const ArticleSearch = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const searchArticles = async () => {
    await find(query)
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    searchArticles();
    setLoading(false);
  }, [query]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : articles.length > 0 ? (
        articles.map((article) => {
          return (
            <ArticleItem
              article={article}
              articles={articles}
              setArticles={setArticles}
            />
          );
        })
      ) : (
        <h1>No hay artículos</h1>
      )}
    </>
  );
};

export default ArticleSearch;
