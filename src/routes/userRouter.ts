import userController from "@controllers/userController";
import { validateToken } from "@middlewares/tokenValidator";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateUserContactDto, CreateUserDto, LoginUserDto } from "dtos/User";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/create", validateDtoMiddleware(CreateUserDto), userController.createUser);
userRouter.post("/login", validateDtoMiddleware(LoginUserDto), userController.loginUser);
userRouter.post(
  "/create-contact",
  validateToken,
  validateDtoMiddleware(CreateUserContactDto),
  userController.createContact,
);
userRouter.get("/contacts", validateToken, userController.getAllContacts);

export default userRouter;
