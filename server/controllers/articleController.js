import Article from "../models/ArticleModel.js";
import {
  databaseErrorHandler,
  notFoundErrorHandler,
} from "../utils/errorHandlers.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  allowedFileExtensions,
  responseStatus,
  responseMessages,
} from "../utils/constants.js";

const item = "Article";
const filePath = "./img/articles/";

const uploads = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, filePath);
    },
    filename: (req, file, callback) => {
      callback(null, `article_${Date.now()}_${file.originalname}`);
    },
  }),
});

const createArticle = (req, res) => {
  const article = new Article(req.body);

  article.save((error, result) => {
    if (error) {
      databaseErrorHandler(res, error);
    } else {
      return res.status(201).json({
        status: responseStatus.success,
        message: responseMessages.post(item),
        data: result
      });
    }
  });
};

const getArticleList = (req, res) => {
  const { filters, sort, limit } = req.query;

  Article.find(filters || {})
    .sort(sort || { date: -1 })
    .limit(limit || 50)
    .exec((error, result) => {
      if (error) {
        databaseErrorHandler(res, error);
      } else if (result.length === 0) {
        notFoundErrorHandler(res);
      } else {
        return res.status(200).json({
          status: responseStatus.success,
          message: responseMessages.ok,
          data: result,
        });
      }
    });
};

const getArticle = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (error, result) => {
    if (error) {
      databaseErrorHandler(res, error);
    } else if (!result) {
      notFoundErrorHandler(res);
    } else {
      return res.status(200).json({
        status: responseStatus.success,
        message: responseMessages.ok,
        data: result,
      });
    }
  });
};

const updateArticle = (req, res) => {
  const { id } = req.params;
  const article = req.body;

  Article.findByIdAndUpdate(
    { _id: id },
    article,
    { _new: true },
    (error, result) => {
      if (error) {
        databaseErrorHandler(res, error);
      } else if (!result) {
        notFoundErrorHandler(res);
      } else {
        return res.status(200).json({
          status: responseStatus.success,
          message: responseMessages.put(item),
          data: result,
        });
      }
    }
  );
};

const deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.findByIdAndDelete({ _id: id }, (error, result) => {
    if (error) {
      databaseErrorHandler(res, error);
    } else if (!result) {
      notFoundErrorHandler(res);
    } else {
      return res.status(200).json({
        status: responseStatus.success,
        message: responseMessages.delete(item),
        data: result,
      });
    }
  });
};

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: responseStatus.error,
      message: responseMessages.uploadFile,
    });
  }

  const extension = req.file.originalname.split(".")[1];

  if (allowedFileExtensions.includes(extension)) {
    const articleId = req.params.id;

    Article.findByIdAndUpdate(
      { _id: articleId },
      { image: req.file.filename },
      { _new: true },
      (error, result) => {
        if (error) {
          databaseErrorHandler(res, error);
        } else if (!result) {
          notFoundErrorHandler(res);
        } else {
          return res.status(200).json({
            status: responseStatus.success,
            message: responseMessages.put(item),
            data:  {
              article: result,
              file: req.file
            }
          });
        }
      }
    );
  } else {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: responseStatus.error,
        message: responseMessages.extensionNotAllowed(extension),
      });
    });
  }
};

const showFile = (req, res) => {
  const { file } = req.params;
  const filePath = `./img/articles/${file}`;

  console.log(filePath);

  fs.stat(filePath, (error, exists) => {
    if (exists) return res.sendFile(path.resolve(filePath));
    else notFoundErrorHandler(res);
  });
};

const findArticle = (req, res) => {
  const { query } = req.params;

  Article.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  })
    .sort({ date: -1 })
    .exec((error, articles) => {
      if (error || !articles) notFoundErrorHandler(res);
      else
        return res.status(200).json({
          status: responseStatus.success,
          message: responseMessages.ok,
          data: articles,
        });
    });
};

export {
  createArticle,
  getArticleList,
  getArticle,
  deleteArticle,
  updateArticle,
  findArticle,
  uploadFile,
  showFile,
  uploads,
};
