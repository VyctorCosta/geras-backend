import { CreateUserDtoType } from "@dtos/User";
import { AccessDeniedError, ConflictError, NotFoundError } from "@middlewares/errorMiddleware";
import { InMemoryUserRepository } from "@repositories/inMemory/inMemoryUserRepository";
import { describe } from "bun:test";
import { beforeEach, expect, it } from "vitest";
import UserService from "./userService";
import isJwtToken from "@utils/isJwtToken";

describe("create user", () => {
  let userRepository: InMemoryUserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  it("should create a user successfully", () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    expect(userService.createUser(user)).resolves.not.toBeInstanceOf(Error);
    expect(userRepository.items.length).toEqual(1);
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
    expect(userRepository.items.length).toEqual(1);
  });
});

describe("login user", () => {
  let userRepository: InMemoryUserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  it("should login successfully and return a jwt token", async () => {
    const user: CreateUserDtoType = {
      name: "John Doe",
      birthage: "1998-06-02",
      email: "johndoe@email.com",
      password: "123456",
    };

    userService.createUser(user);

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
