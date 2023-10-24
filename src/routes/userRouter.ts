import userController from "@controllers/userController";
import { validateToken } from "@middlewares/tokenValidator";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateUserDto, LoginUserDto } from "dtos/User";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/create", validateDtoMiddleware(CreateUserDto), userController.createUser);
userRouter.post("/login", validateDtoMiddleware(LoginUserDto), userController.loginUser);
userRouter.get("/test", validateToken, userController.testToken);

export default userRouter;
