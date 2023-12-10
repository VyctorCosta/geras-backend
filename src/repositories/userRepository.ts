import prisma from "@config/database";
import { ConflictError } from "@middlewares/errorMiddleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserContactType, UserType } from "dtos/User";

export interface IUserRepository {
  createUser(user: UserType): Promise<void>;
  getUserByLogin(login: string): Promise<UserType | null>;
  createUserContact(userContact: UserContactType): Promise<void>;
  getUserContacts(userId: string): Promise<UserContactType[] | null>;
}

export default class UserRepository implements IUserRepository {
  public async createUser({ contacts: _, ...user }: UserType): Promise<void> {
    try {
      await prisma.tb_user.create({
        data: user,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (
          err.message.split("\n").at(-1) === "Unique constraint failed on the fields: (`email`)"
        ) {
          throw new ConflictError("Email");
        }
      }
    }
  }

  public async getUserByLogin(login: string): Promise<UserType | null> {
    const user = (await prisma.tb_user.findFirst({
      where: {
        email: login,
      },
    })) as UserType;

    return user;
  }

  public async createUserContact(userContact: UserContactType): Promise<void> {
    const data = userContact;

    try {
      const contact = await prisma.tb_contact_user.findFirst({
        where: { first_name: userContact.first_name, last_name: userContact.last_name },
      });
      if (contact !== null) {
        throw new Error("contact_already_exists");
      }

      await prisma.tb_contact_user.create({ data });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (
          err.message.split("\n").at(-1) === "Unique constraint failed on the fields: (`phone`)"
        ) {
          throw new ConflictError("Phone");
        }
      } else if (err instanceof Error) {
        if (err.message === "contact_already_exists") {
          throw new ConflictError("Contact");
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
