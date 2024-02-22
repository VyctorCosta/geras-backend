import { EmailType, CreateEmailDtoType } from "@dtos/Email";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

class emailMapper {
  public DtoToEmail(createEmail: CreateEmailDtoType): EmailType {
    const id = uuidv4();

    return {
      id,
      email: createEmail.email,
      phone: createEmail.phone,
      password: bcrypt.hashSync(createEmail.password, bcrypt.genSaltSync(10)),
    };
  }
}

export default new emailMapper();
