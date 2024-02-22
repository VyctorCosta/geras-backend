import { EmailType } from "@dtos/Email";
import { ConflictError } from "@middlewares/errorMiddleware";
import { IEmailRepository } from "@repositories/emailRepository";

export class InMemoryEmailRepository implements IEmailRepository {
  public tb_email: EmailType[] = [];

  public async createEmail(user: EmailType): Promise<void> {
    if (this.tb_email.find(({ email }) => email === user.email)) {
      throw new ConflictError("Email");
    }

    this.tb_email.push(user);
  }

  public async getEmailByLogin(login: string): Promise<EmailType | null> {
    const user = this.tb_email.find(({ email }) => email === login);

    if (!user) return null;

    return user;
  }

  public resetDatabase() {
    this.tb_email = [];
  }
}
