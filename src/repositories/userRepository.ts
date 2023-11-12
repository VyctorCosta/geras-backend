import prisma from "@config/database";
import { conflictError } from "@middlewares/errorMiddleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserContactType, UserType } from "dtos/User";

class userRepository {
  public async createUser(user: UserType): Promise<void> {
    try {
      await prisma.tb_user.create({
        data: user,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (
          err.message.split("\n").at(-1) === "Unique constraint failed on the fields: (`email`)"
        ) {
          throw conflictError("Email");
        }
      }
    }
  }

  public async getUserByLogin(login: string): Promise<UserType | null> {
    const user = await prisma.tb_user.findFirst({
      where: {
        email: login,
      },
    });
    return user;
  }

  public async createUserContact(userContact: UserContactType, userId: string): Promise<void> {
    const data = { ...userContact, user_id: userId };

    try {
      const user = await prisma.tb_contact_user.findFirst({
        where: { first_name: userContact.first_name, last_name: userContact.last_name },
      });
      if (user !== null) {
        throw new Error("contact_already_exists");
      }

      await prisma.tb_contact_user.create({ data });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (
          err.message.split("\n").at(-1) === "Unique constraint failed on the fields: (`phone`)"
        ) {
          throw conflictError("Phone");
        }
      } else if (err instanceof Error) {
        if (err.message === "contact_already_exists") {
          throw conflictError("Contact");
        }
      }
    }
  }

  public async getUserContacts(userId: string): Promise<UserContactType[] | null> {
    return await prisma.tb_user
      .findFirst({
        where: { id: userId },
      })
      .contacts();
  }
}

export default new userRepository();
