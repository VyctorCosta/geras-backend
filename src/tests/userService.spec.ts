import { CreateUserContactDto, CreateUserDtoType, UserType } from "@dtos/User";
import { AccessDeniedError, ConflictError, NotFoundError } from "@middlewares/errorMiddleware";
import { InMemoryUserRepository } from "@repositories/inMemory/inMemoryUserRepository";
import isJwtToken from "@utils/isJwtToken";
import { describe } from "bun:test";
import { afterEach, beforeEach, expect, it } from "vitest";
import UserService from "../services/userService";

describe("create user", () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  afterEach(() => {
    userRepository.resetDatabase();
  });

  it("should create a user successfully", () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    expect(userService.createUser(user)).resolves.not.toBeInstanceOf(Error);
    expect(userRepository.tb_user.length).toEqual(1);
  });

  it("should cannot create a user because email already registered", async () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    await userService.createUser(user);

    const wrongUser: CreateUserDtoType = {
      name: "John Doe 2",
      birthage: "1996-10-10",
      email: "johndoe@email.com",
      password: "654321",
    };

    expect(userService.createUser(wrongUser)).rejects.toBeInstanceOf(ConflictError);
    expect(userRepository.tb_user.length).toEqual(1);
  });
});

describe("login user", () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  beforeEach(() => {
    userRepository.resetDatabase();
  });

  it("should login successfully and return a jwt token", async () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    await userService.createUser(user);

    expect(await userService.loginUser("johndoe@email.com", "123456")).toSatisfy(isJwtToken);
  });

  it("should not login because email not exists", () => {
    expect(userService.loginUser("johndoe@email.com", "123456")).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it("should not login because password is wrong", () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    userService.createUser(user);

    expect(userService.loginUser("johndoe@email.com", "654321")).rejects.toBeInstanceOf(
      AccessDeniedError,
    );
  });
});

describe("create user contact", () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  beforeEach(() => {
    userRepository.resetDatabase();

    const user: UserType = {
      id: "db9b3fbb-047f-4b65-9cfe-699f6550f557",
      name: "John Doe",
      birthage: new Date("1998-06-02"),
      email: "johndoe@email.com",
      password: "123456",
      contacts: [],
    };
    userRepository.tb_user.push(user);
  });

  it("should create user contact successfully", () => {
    const userId = "db9b3fbb-047f-4b65-9cfe-699f6550f557";

    const userContact: CreateUserContactDto = {
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
    };

    expect(userService.createUserContact(userContact, userId)).resolves.not.toBeInstanceOf(Error);
    expect(userRepository.tb_contact_user.length).toEqual(1);
  });

  it("should cannot create a contact because it already exists", async () => {
    const userId = "db9b3fbb-047f-4b65-9cfe-699f6550f557";

    const userContact: CreateUserContactDto = {
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
    };

    await userService.createUserContact(userContact, userId);

    const wrongContact: CreateUserContactDto = {
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 9992-5432",
    };

    expect(userService.createUserContact(wrongContact, userId)).rejects.toBeInstanceOf(
      ConflictError,
    );
    expect(userRepository.tb_contact_user.length).toEqual(1);
  });

  it("should cannot create a contact because phone already exists", async () => {
    const userId = "db9b3fbb-047f-4b65-9cfe-699f6550f557";

    const userContact: CreateUserContactDto = {
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
    };

    await userService.createUserContact(userContact, userId);

    const wrongContact: CreateUserContactDto = {
      first_name: "Rowan",
      last_name: "Nicolaus",
      phone: "+55 81 9 8887-6356",
    };

    expect(userService.createUserContact(wrongContact, userId)).rejects.toBeInstanceOf(
      ConflictError,
    );
    expect(userRepository.tb_contact_user.length).toEqual(1);
  });

  it("should cannot create a contact because user doesn't exists", async () => {
    const userId = "4ee9f5d7-18ae-4c0c-a06c-194240fe51fa";

    const userContact: CreateUserContactDto = {
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
    };

    expect(userService.createUserContact(userContact, userId)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(userRepository.tb_contact_user.length).toEqual(0);
  });
});

describe("get user contact", () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  beforeEach(() => {
    userRepository.resetDatabase();

    const userContact = {
      id: "5523a98f-811b-4723-b0ba-679f3f79349c",
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
      user_id: "db9b3fbb-047f-4b65-9cfe-699f6550f557",
    };
    const user: UserType = {
      id: "db9b3fbb-047f-4b65-9cfe-699f6550f557",
      name: "John Doe",
      birthage: new Date("1998-06-02"),
      email: "johndoe@email.com",
      password: "123456",
      contacts: [userContact],
    };
    userRepository.tb_user.push(user);
    userRepository.tb_contact_user.push(userContact);
  });

  it("should get user contacts successfully", () => {
    const userId = "db9b3fbb-047f-4b65-9cfe-699f6550f557";
    const userContact = {
      id: "5523a98f-811b-4723-b0ba-679f3f79349c",
      first_name: "Perry",
      last_name: "Morar",
      phone: "+55 81 9 8887-6356",
      user_id: "db9b3fbb-047f-4b65-9cfe-699f6550f557",
    };

    expect(userService.getUserContacts(userId)).resolves.toEqual([userContact]);
  });

  it("should not get contacts because user doesn't exists", () => {
    const userId = "f577559c-1efd-4478-a4e1-ccd697226eb4";

    expect(userService.getUserContacts(userId)).rejects.toBeInstanceOf(NotFoundError);
  });
});
