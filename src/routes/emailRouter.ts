import emailController from "@controllers/emailController";
import { validateToken } from "@middlewares/tokenValidator";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateEmailDto, LoginEmailDto } from "dtos/Email";
import { Router } from "express";

const emailRouter = Router();

emailRouter.post("/create", validateDtoMiddleware(CreateEmailDto), emailController.createEmail);
emailRouter.post("/login", validateDtoMiddleware(LoginEmailDto), emailController.loginEmail);
emailRouter.get("/test", validateToken, emailController.testToken);

export default emailRouter;
