import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "./connection/index.js";
import { env } from "./config/index.js";
import path from "path";
import router from "./router/index.js";
const __dirname = path.resolve();

const app = express();
app.use(logger(env.STAGE));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Url Not Found",
    data: null,
  });
});

app.listen(env.PORT, () => {
  console.info(`Server running on port ${env.PORT}`);
});
