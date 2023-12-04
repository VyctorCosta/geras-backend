import userController from "@controllers/userController";
import { validateToken } from "@middlewares/tokenValidator";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateUserContactDto, CreateUserDto, LoginUserDto } from "dtos/User";
import { Router } from "express";

const userRouter = Router();

userRouter.post(
  "/create",
  validateDtoMiddleware(CreateUserDto),
  userController.createUser.bind(userController),
);
userRouter.post(
  "/login",
  validateDtoMiddleware(LoginUserDto),
  userController.loginUser.bind(userController),
);
userRouter.post(
  "/create-contact",
  validateToken,
  validateDtoMiddleware(CreateUserContactDto),
  userController.createContact.bind(userController),
);
userRouter.get("/contacts", validateToken, userController.getAllContacts.bind(userController));

export default userRouter;
