import express from "express";
import { register } from "./controller.js";

const userRouter = express.Router();

// Home page route.
userRouter.post("/register", register);

export default userRouter;
