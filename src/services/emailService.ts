import { AccessDeniedError, NotFoundError } from "@middlewares/errorMiddleware";
import { IEmailRepository } from "@repositories/emailRepository";
import { CreateEmailDtoType } from "dtos/Email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import emailMapper from "@utils/emailMapper";

export default class emailService {
  private emailRepository: IEmailRepository;

  constructor(emailRepository: IEmailRepository) {
    this.emailRepository = emailRepository;
  }
  public async createEmail(createEmailDto: CreateEmailDtoType): Promise<void> {
    // email.password = bcrypt.hashSync(email.password, bcrypt.genSaltSync(10));
    const email = emailMapper.DtoToEmail(createEmailDto);

    await this.emailRepository.createEmail(email);
  }

  public async loginUser(login: string, password: string): Promise<string> {
    const userEmail = await this.emailRepository.getEmailByLogin(login);

    if (!userEmail) {
      throw new NotFoundError("Email");
    }

    if (!bcrypt.compareSync(password, userEmail.password)) {
      throw new AccessDeniedError("login because password is wrong");
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

  public async resetPassword(email: string): Promise<void> {
    const userEmail = await this.emailRepository.getEmailByLogin(email);

    if (!userEmail) {
      throw new NotFoundError("Email not found");
    }

    const newPassword = Math.random().toString(36).slice(-8);

    userEmail.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

    await this.emailRepository.createEmail(userEmail);
  }
}
