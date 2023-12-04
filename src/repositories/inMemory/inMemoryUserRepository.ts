import { UserContactType, UserType } from "@dtos/User";
import { ConflictError } from "@middlewares/errorMiddleware";
import { IUserRepository } from "@repositories/userRepository";

export class InMemoryUserRepository implements IUserRepository {
  public items: UserType[] = [];

  async createUser(user: UserType): Promise<void> {
    if (this.items.find(({ email }) => email === user.email)) {
      throw new ConflictError("Email");
    }

    this.items.push(user);
  }

  async createUserContact(userContact: UserContactType, userId: string): Promise<void> {}

  async getUserByLogin(login: string): Promise<UserType | null> {
    const user = this.items.find(({ email }) => email === login);

    if (!user) return null;

    return user;
  }

  async getUserContacts(userId: string): Promise<UserContactType[] | null> {
    return null;
  }
}
