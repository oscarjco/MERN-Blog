import React, { useState, useEffect } from "react";
import ArticleItem from "./ArticleItem";
import ReactPaginate from "react-paginate";
import { list } from "../../../hooks/useArticleApi";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching Articles from another resources.
  // (This could be Articles from props; or Articles loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 5;
  const currentArticles = articles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articles.length / 5);

  const getArticles = async () => {
    await list()
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % articles.length;
    setItemOffset(newOffset);
  };

  const Articles = ({ currentArticles }) => {
    return (
      <>
        {currentArticles &&
          currentArticles.map((article) => (
            <ArticleItem
              article={article}
              articles={articles}
              setArticles={setArticles}
            />
          ))}
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    getArticles();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <Articles currentArticles={currentArticles} />
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="paginator"
            pageLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            activeLinkClassName="active"
          />
        </>
      )}
    </>
  );
};

export default ArticleList;
