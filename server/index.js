import connection from "./database/connection.js";
import express from "express";
import cors from "cors";
import articleRouter from "./routes/articleRouter.js";
import { articleValidator } from "./validators/articleValidator.js";
import expressRequestResponseLogger from "express-request-response-logger";

const PORT = 5000;
const dbName = "blog";

connection(dbName);

express()
  //Middlewares
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", expressRequestResponseLogger())
  // .use("/article", articleValidator)
  //Routes
  .get("/", (req, res) => {
    res.send(`
    <h1>What are you doing here?!</h1>
    <p>This is a server, you asshole! Go to the frontend page!</p>
    `);
  })
  .use("/article", articleRouter)
  .listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
