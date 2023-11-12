import { accessDeniedError, notFoundError } from "@middlewares/errorMiddleware";
import userRepository from "@repositories/userRepository";
import userMapper from "@utils/userMapper";
import bcrypt from "bcryptjs";
import { CreateUserContactDto, CreateUserDtoType, UserContactType } from "dtos/User";
import jwt from "jsonwebtoken";

class userService {
  public async createUser(createUserDto: CreateUserDtoType): Promise<void> {
    const user = userMapper.DtoToUser(createUserDto);

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

  public async createUserContact(
    createUserContactDto: CreateUserContactDto,
    userId: string,
  ): Promise<void> {
    const userContact = userMapper.DtoToUserContact(createUserContactDto);

    await userRepository.createUserContact(userContact, userId);
  }

  public async getUserContacts(userId: string): Promise<UserContactType[]> {
    const userContacts = await userRepository.getUserContacts(userId);

    if (userContacts === null) {
      throw notFoundError("User");
    }

    return userContacts;
  }
}

export default new userService();
