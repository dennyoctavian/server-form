import express from "express";
import userRouter from "../app/users/router.js";
const router = express.Router();

router.use("/user", userRouter);

export default router;
