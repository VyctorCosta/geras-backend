import { CreateUserContactDto, CreateUserDtoType, UserContactType, UserType } from "@dtos/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

class userMapper {
  public DtoToUser(createUser: CreateUserDtoType): UserType {
    const id = uuidv4();

    return {
      id,
      name: createUser.name,
      birthage: new Date(createUser.birthage),
      email: createUser.email,
      password: bcrypt.hashSync(createUser.password, bcrypt.genSaltSync(10)),
    };
  }

  public DtoToUserContact(userContactDto: CreateUserContactDto, userId: string): UserContactType {
    const id = uuidv4();

    return {
      id,
      first_name: userContactDto.first_name,
      last_name: userContactDto.last_name,
      phone: userContactDto.phone,
      user_id: userId,
    };
  }
}

export default new userMapper();
