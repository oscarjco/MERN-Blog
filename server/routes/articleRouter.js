import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  findArticle,
  getArticle,
  getArticleList,
  showFile,
  updateArticle,
  uploadFile,
  uploads,
} from "../controllers/articleController.js";
import { articleValidator } from "../validators/articleValidator.js";

const articleRouter = Router();
articleRouter.post("/", [articleValidator], createArticle);
articleRouter.get("/", getArticleList);
articleRouter.get("/:id", getArticle);
articleRouter.put("/:id", [articleValidator], updateArticle);
articleRouter.delete("/:id", deleteArticle);
articleRouter.get("/find/:query", findArticle);
articleRouter.post("/file/:id", [uploads.single("file")], uploadFile);
articleRouter.get("/file/:file", showFile);

export default articleRouter;
