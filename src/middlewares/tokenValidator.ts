import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MissingHeaderError, UnauthorizedError } from "@middlewares/errorMiddleware";

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;

  if (secretKey === undefined || token === undefined) {
    throw new MissingHeaderError("Authorization is missing");
  }

  try {
    const user = jwt.verify(token, secretKey);

    res.locals.user = user;

    next();
  } catch {
    throw new UnauthorizedError("Token");
  }
}
