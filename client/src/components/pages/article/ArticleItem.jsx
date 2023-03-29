import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../../hooks/useArticleApi";
import { Mask } from "../../layout";

const ArticleItem = ({ article, articles, setArticles }) => {
  
  const deleteArticle = async () => {
    await remove(article._id)
      .then((removed) => {
        if (removed) setArticles(articles.filter((item) => item !== article));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <article key={article._id} className="article-item">
        <Mask image={article.image} />
        <div className="data">
          <h3 className="title">
            <Link to={`/article/${article._id}`}>{article.title}</Link>
          </h3>
          <p className="description">{article.content}</p>
          <Link to={`/edit/${article._id}`} className="edit">
            Editar
          </Link>
          <button className="delete" onClick={deleteArticle}>
            Eliminar
          </button>
        </div>
      </article>
    </>
  );
};

export default ArticleItem;
