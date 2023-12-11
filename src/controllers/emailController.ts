import emailService from "@services/emailService";
import { EmailType } from "dtos/Email";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

class emailController {
  public async createEmail(req: Request, res: Response) {
    const body = req.body as EmailType;
    body.id = uuidv4();

    await emailService.createEmail(body);

    return res.sendStatus(201);
  }

  public async loginEmail(req: Request, res: Response) {
    const body = req.body as { login: string; password: string };

    const token = await emailService.loginUser(body.login, body.password);

    return res.status(200).json({ access_token: token });
  }

  public async testToken(_: Request, res: Response) {
    return res.sendStatus(200);
  }

  public async resetPassword(req: Request, res: Response) {
    const body = req.body as { email: string };

    await emailService.resetPassword(body.email);

    return res.sendStatus(200);
  }
}

export default new emailController();
