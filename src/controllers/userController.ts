import userService from "@services/userService";
import { UserType } from "dtos/User";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

class userController {
  public async createUser(req: Request, res: Response) {
    console.log("controller");
    const body = req.body as UserType;
    body.id = uuidv4();
    body.birthage = new Date(body.birthage);

    await userService.createUser(body);

    return res.sendStatus(201);
  }
}

export default new userController();
