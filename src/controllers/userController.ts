import userService from "@services/userService";
import { UserType } from "dtos/User";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

class userController {
  public async createUser(req: Request, res: Response) {
    const body = req.body as UserType;
    body.id = uuidv4();
    body.birthage = new Date(body.birthage);

    await userService.createUser(body);

    return res.sendStatus(201);
  }

  public async loginUser(req: Request, res: Response) {
    const body = req.body as { login: string; password: string };

    const token = await userService.loginUser(body.login, body.password);

    return res.status(200).json({ access_token: token });
  }

  public async testToken(_: Request, res: Response) {
    return res.sendStatus(200);
  }
}

export default new userController();
