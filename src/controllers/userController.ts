import UserRepository from "@repositories/userRepository";
import UserService from "@services/userService";
import { CreateUserContactDto, CreateUserDtoType, UserType } from "dtos/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class UserController {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
  }

  public async createUser(req: Request, res: Response) {
    const body = req.body as CreateUserDtoType;

    await this.userService.createUser(body);

    return res.sendStatus(201);
  }

  public async loginUser(req: Request, res: Response) {
    const body = req.body as { login: string; password: string };

    const token = await this.userService.loginUser(body.login, body.password);

    return res.status(200).json({ access_token: token });
  }

  public async createContact(req: Request, res: Response) {
    const body = req.body as CreateUserContactDto;
    const token = req.headers.authorization!.replace("Bearer ", "");
    const user = jwt.decode(token) as UserType;

    await this.userService.createUserContact(body, user.id);

    return res.sendStatus(201);
  }

  public async getAllContacts(req: Request, res: Response) {
    const token = req.headers.authorization!.replace("Bearer ", "");
    const user = jwt.decode(token) as UserType;

    const userContacts = await this.userService.getUserContacts(user.id);

    return res.status(200).json(userContacts);
  }
}

export default new UserController();
