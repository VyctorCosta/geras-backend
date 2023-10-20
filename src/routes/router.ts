import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();

router.use("/v1/user", userRouter);

export default router;
