import { UserContactType, UserType } from "@dtos/User";
import { ConflictError, NotFoundError } from "@middlewares/errorMiddleware";
import { IUserRepository } from "@repositories/userRepository";

export class InMemoryUserRepository implements IUserRepository {
  public tb_user: UserType[] = [];
  public tb_contact_user: UserContactType[] = [];

  public async createUser(user: UserType): Promise<void> {
    if (this.tb_user.find(({ email }) => email === user.email)) {
      throw new ConflictError("Email");
    }

    this.tb_user.push(user);
  }

  public async createUserContact(userContact: UserContactType): Promise<void> {
    if (
      this.tb_contact_user.find(
        ({ first_name, last_name }) =>
          first_name === userContact.first_name && last_name === userContact.last_name,
      )
    ) {
      throw new ConflictError("Contact");
    }

    if (this.tb_contact_user.find(({ phone }) => phone === userContact.phone)) {
      throw new ConflictError("Phone");
    }

    if (!this.tb_user.find(({ id }) => id === userContact.user_id)) {
      throw new NotFoundError("User");
    }

    this.tb_contact_user.push(userContact);
  }

  public async getUserByLogin(login: string): Promise<UserType | null> {
    const user = this.tb_user.find(({ email }) => email === login);

    if (!user) return null;

    return user;
  }

  public async getUserContacts(userId: string): Promise<UserContactType[] | null> {
    const user = this.tb_user.find(({ id }) => id === userId);

    if (user) {
      user.contacts = this.tb_contact_user.filter(({ user_id }) => user_id === user.id);
      return user.contacts;
    }

    return null;
  }

  public resetDatabase() {
    this.tb_user = [];
    this.tb_contact_user = [];
  }
}
