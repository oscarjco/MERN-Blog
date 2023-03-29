import validator from "validator";

const articleValidator = (req, res, next) => {
  let validationError = undefined;

  switch (req.method) {
    case "POST":
    case "PUT":
      validationError = validateArticle(req.body);
    default:
      break;
  }

  if (validationError) {
    res.status(400).json({
      status: `error`,
      message: validationError,
    });
  } else {
    next();
  }
};

const validateArticle = (article) => {
  const {title, content} = article;

  if (!title || validator.isEmpty(title)) {
    return `Title is required`;
  } 
  if (!validator.isLength(title, { min: 8, max: 80 })) {
    return `Wrong length for title`;
  } 
  if (!content || validator.isEmpty(content)) {
    return `Content is required`;
  }
};

export { articleValidator };
