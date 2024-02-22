import EmailRepository from "@repositories/emailRepository";
import EmailService from "@services/emailService";
import { CreateEmailDtoType } from "dtos/Email";
import { Request, Response } from "express";

class EmailController {
  private emailRepository: EmailRepository;
  private emailService: EmailService;

  constructor() {
    this.emailRepository = new EmailRepository();
    this.emailService = new EmailService(this.emailRepository);
  }

  public async createEmail(req: Request, res: Response) {
    const body = req.body as CreateEmailDtoType;

    await this.emailService.createEmail(body);

    return res.sendStatus(201);
  }

  public async loginEmail(req: Request, res: Response) {
    const body = req.body as { login: string; password: string };

    const token = await this.emailService.loginUser(body.login, body.password);

    return res.status(200).json({ access_token: token });
  }

  public async testToken(_: Request, res: Response) {
    return res.sendStatus(200);
  }

  public async resetPassword(req: Request, res: Response) {
    const body = req.body as { email: string };

    await this.emailService.resetPassword(body.email);

    return res.sendStatus(200);
  }
}

export default new EmailController();
