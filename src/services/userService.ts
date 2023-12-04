import { NotFoundError, AccessDeniedError } from "@middlewares/errorMiddleware";
import { IUserRepository } from "@repositories/userRepository";
import userMapper from "@utils/userMapper";
import bcrypt from "bcryptjs";
import { CreateUserContactDto, CreateUserDtoType, UserContactType } from "dtos/User";
import jwt from "jsonwebtoken";

export default class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(createUserDto: CreateUserDtoType): Promise<void> {
    const user = userMapper.DtoToUser(createUserDto);

    await this.userRepository.createUser(user);
  }

  public async loginUser(login: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByLogin(login);

    if (!user) {
      throw new NotFoundError("Email");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AccessDeniedError("login because password is wrong");
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

    await this.userRepository.createUserContact(userContact, userId);
  }

  public async getUserContacts(userId: string): Promise<UserContactType[]> {
    const userContacts = await this.userRepository.getUserContacts(userId);

    if (userContacts === null) {
      throw new NotFoundError("User");
    }

    return userContacts;
  }
}
