import { accessDeniedError, notFoundError } from "@middlewares/errorMiddleware";
import emailRepository from "@repositories/emailRepository";
import { EmailType } from "dtos/Email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class emailService {
  public async createEmail(email: EmailType): Promise<undefined> {
    email.password = bcrypt.hashSync(email.password, bcrypt.genSaltSync(10));

    await emailRepository.createEmail(email);
  }

  public async loginUser(login: string, password: string): Promise<string> {
    const userEmail = await emailRepository.getEmailByLogin(login);

    if (!userEmail) {
      throw notFoundError("Email");
    }

    if (!bcrypt.compareSync(password, userEmail.password)) {
      throw accessDeniedError("login because password is wrong");
    }

    const token = jwt.sign(
      { id: userEmail.id, name: userEmail.name, email: userEmail.email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "72h",
      },
    );

    return token;
  }

  public async resetPassword(email: string): Promise<undefined> {
    const userEmail = await emailRepository.getEmailByLogin(email);

    if (!userEmail) {
      throw notFoundError("Email not found");
    }

    const newPassword = Math.random().toString(36).slice(-8);

    userEmail.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

    await emailRepository.createEmail(userEmail);
  }
}

export default new emailService();
