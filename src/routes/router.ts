import { Router } from "express";
import userRouter from "./userRouter";
import emailRouter from "./emailRouter";

const router = Router();

router.use("/v1/user", userRouter);
router.use("/v1/email", emailRouter);

export default router;
