import userController from "@controllers/userController";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateUserDto } from "dtos/User";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/create", validateDtoMiddleware(CreateUserDto), userController.createUser);

export default userRouter;
