import { accessDeniedError, notFoundError } from "@middlewares/errorMiddleware";
import emailRepository from "@repositories/emailRepository";
import { EmailType } from "dtos/Email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class emailService {
  public async createEmail(email: EmailType): Promise<undefined> {
    email.password = bcrypt.hashSync(email.password, bcrypt.genSaltSync(10));

    await emailRepository.createEmail(email as EmailType & { first_name: string, last_name: string });
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
}

export default new emailService();
