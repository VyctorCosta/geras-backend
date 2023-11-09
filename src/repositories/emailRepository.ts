import prisma from "@config/database";
import { conflictError } from "@middlewares/errorMiddleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { EmailType } from "dtos/Email";

class emailRepository {
  public async createEmail(emailUser: EmailType & { first_name: string, last_name: string }): Promise<undefined> {
    try {
      await prisma.tb_contact_user.create({
        data: emailUser

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
    const email = await prisma.tb_contact_user.findFirst({
      where: {
        email: login,
      },
    });
    if (email) {
      const { id, first_name, last_name, phone, email, password } = email;
      return { id, name: first_name, lastname: last_name, phone, email, password };
    }
    return null;
  }
}


export default new emailRepository();
