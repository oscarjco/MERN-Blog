import React from "react";
import {
  Routes as Routing,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/pages/Dashboard";
import {
  ArticleCreate,
  ArticleDetails,
  ArticleList,
  ArticleSearch,
  ArticleUpdate,
} from "../components/pages/article";
import { Footer, Header, Nav, Sidebar } from "../components/layout";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <section id="content" className="content">
        <Routing>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/find/:query" element={<ArticleSearch />} />
          <Route path="/add" element={<ArticleCreate />} />
          <Route path="/edit/:id" element={<ArticleUpdate />} />

          <Route
            path="*"
            element={
              <div className="card">
                <h1>Error 404</h1>
                <h2>Not Found</h2>
              </div>
            }
          />
        </Routing>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
