import userRepository from "@repositories/userRepository";
import { UserType } from "dtos/User";

class userService {
  public async createUser(user: UserType): Promise<undefined> {
    await userRepository.createUser(user);
  }
}

export default new userService();
