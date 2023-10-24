import { accessDeniedError, notFoundError } from "@middlewares/errorMiddleware";
import userRepository from "@repositories/userRepository";
import { UserType } from "dtos/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class userService {
  public async createUser(user: UserType): Promise<undefined> {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

    await userRepository.createUser(user);
  }

  public async loginUser(login: string, password: string): Promise<string> {
    const user = await userRepository.getUserByLogin(login);

    if (!user) {
      throw notFoundError("Email");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw accessDeniedError("login because password is wrong");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "72h",
      },
    );

    return token;
  }
}

export default new userService();
