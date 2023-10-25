import prisma from "@config/database";
import { conflictError } from "@middlewares/errorMiddleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserType } from "dtos/User";

class userRepository {
  public async createUser(user: UserType): Promise<undefined> {
    try {
      await prisma.tb_user.create({
        data: user,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.message.split("\n").at(-1) == "Unique constraint failed on the fields: (`email`)") {
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
}

export default new userRepository();
