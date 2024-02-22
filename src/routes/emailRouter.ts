import EmailController from "@controllers/emailController";
import { validateToken } from "@middlewares/tokenValidator";
import { validateDtoMiddleware } from "@middlewares/validateDtoMiddleware";
import { CreateEmailDto, LoginEmailDto, ResetEmailDto } from "dtos/Email";
import { Router } from "express";

const emailRouter = Router();

emailRouter.post("/create", validateDtoMiddleware(CreateEmailDto), EmailController.createEmail);
emailRouter.post("/login", validateDtoMiddleware(LoginEmailDto), EmailController.loginEmail);
emailRouter.post("/reset-password", validateDtoMiddleware(ResetEmailDto), EmailController.resetPassword);
emailRouter.get("/test", validateToken, EmailController.testToken);

export default emailRouter;
