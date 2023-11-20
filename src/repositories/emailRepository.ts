import prisma from "@config/database";
import { conflictError } from "@middlewares/errorMiddleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { EmailType } from "dtos/Email";

class emailRepository {
  public async createEmail(emailUser: EmailType): Promise<undefined> {
    try {
      await prisma.tb_contact_user.create({
        data: {
          id: emailUser.id,
          email: emailUser.email,
          first_name: emailUser.name,
          last_name: emailUser.lastname,
          password: emailUser.password,
          phone: emailUser.phone,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.message.split("\n").at(-1) == "Unique constraint failed on the fields: (`email`)") {
          throw conflictError("Email");
        }
      }
    }
  }

  public async getEmailByLogin(login: string): Promise<EmailType | null> {
    const user = await prisma.tb_contact_user.findFirst({
      where: {
        email: login,
      },
    });
    if (user) {
      return {
        id: user.id,
        name: user.first_name,
        lastname: user.last_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
      };
    }
    return null;
  }
}

export default new emailRepository();
